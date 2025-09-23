import { users } from '../../generated/prisma/client';
import prisma from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import httpStatus from 'http-status';

/**
 * Get user by ID
 * @param {number} userId
 * @returns {Promise<users | null>}
 */
export const getUserById = async (userId: number): Promise<users | null> => {
    const user = await prisma.users.findUnique({ where: { user_id: userId } });
    if (user) {
        // @ts-ignore
        delete user.password_hash;
    }
    return user;
};

/**
 * Update user profile
 * @param {number} userId
 * @param {Partial<users>} updateBody
 * @returns {Promise<users>}
 */
export const updateUserProfile = async (userId: number, updateBody: Partial<users>): Promise<users> => {
    // Prevent sensitive fields from being updated via this service
    delete updateBody.password_hash;
    delete updateBody.role;
    delete updateBody.account_status;
    delete updateBody.email;

    const user = await prisma.users.update({
        where: { user_id: userId },
        data: updateBody,
    });
    // @ts-ignore
    delete user.password_hash;
    return user;
};

/**
 * Mark a family member as missing
 * @param {number} userId
 * @param {number} memberId
 * @returns {Promise<users>}
 */
export const fileFamilyMemberMissing = async (userId: number, memberId: number): Promise<users> => {
    const member = await prisma.users.findFirst({
        where: {
            user_id: memberId,
            parent_user_id: userId
        }
    });

    if (!member) {
        throw new AppError(httpStatus.NOT_FOUND, 'Family member not found or you are not authorized.');
    }

    return prisma.users.update({
        where: { user_id: memberId },
        data: { missing_status: 'Missing' }
    });
};