import { users } from '../../generated/prisma/client';
import prisma from '../../utils/prisma';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import { AppError } from '../../utils/AppError';
import { uploadFileToStorage } from './file.service';

interface FileUpload {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
}

/**
 * Create a new user (citizen/official/analyst).
 */
export const registerUser = async (
    userData: any,
    files?: {
        photo?: FileUpload[];
        id_proof_document?: FileUpload[];
        authorization_letter?: FileUpload[];
    },
): Promise<users> => {
    // 1) Prevent duplicate email or username
    if (await prisma.users.findUnique({ where: { email: userData.email } })) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (
        userData.username &&
        (await prisma.users.findUnique({ where: { username: userData.username } }))
    ) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Username already taken');
    }

    // 2) Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // 3) Upload files if provided
    let photoUrl: string | undefined;
    let idProofUrl: string | undefined;
    let authLetterUrl: string | undefined;
    const baseId = `user_${Date.now()}`;

    if (files?.photo?.[0]) {
        const file = files.photo[0];
        const fileName = `${baseId}_profile_${file.originalname}`;
        photoUrl = await uploadFileToStorage(file.buffer, fileName, 'user-documents');
    }
    if (files?.id_proof_document?.[0]) {
        const file = files.id_proof_document[0];
        const fileName = `${baseId}_idproof_${file.originalname}`;
        idProofUrl = await uploadFileToStorage(file.buffer, fileName, 'user-documents');
    }
    if (files?.authorization_letter?.[0]) {
        const file = files.authorization_letter[0];
        const fileName = `${baseId}_authletter_${file.originalname}`;
        authLetterUrl = await uploadFileToStorage(file.buffer, fileName, 'user-documents');
    }

    // 4) Persist user
    const newUser = await prisma.users.create({
        data: {
            name: userData.fullname,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            password_hash: hashedPassword,
            role: userData.role.charAt(0).toUpperCase() + userData.role.slice(1),
            city: userData.city,
            state: userData.state,
            country: userData.country,
            profile_photo: photoUrl,
            id_proof_document: idProofUrl,
            authorization_letter: authLetterUrl,
            designation: userData.designation,
            organization_name: userData.organizationName,
            employee_id: userData.employeeId,
        },
    });

    // hide the hash before returning
    // @ts-ignore
    delete newUser.password_hash;
    return newUser;
};

/**
 * Authenticate user by email or username + password.
 */
export const loginUser = async (
    identifier: string,
    password: string,
): Promise<users> => {
    const user = await prisma.users.findFirst({
        where: {
            OR: [{ email: identifier }, { username: identifier }],
        },
    });

    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect email/username or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect email/username or password');
    }

    // update last login timestamp
    await prisma.users.update({
        where: { user_id: user.user_id },
        data: { last_login_date: new Date() },
    });

    // hide hash
    // @ts-ignore
    delete user.password_hash;
    return user;
};
