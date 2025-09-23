import multer, { FileFilterCallback } from 'multer';
import { AppError } from '../utils/AppError';
import httpStatus from 'http-status';

const storage = multer.memoryStorage();

const fileFilter = (
    _req: any,
    file: Express.Multer.File,
    cb: FileFilterCallback,
) => {
    if (
        file.mimetype.startsWith('image') ||
        file.mimetype.startsWith('video')
    ) {
        cb(null, true);
    } else {
        cb(new AppError(httpStatus.BAD_REQUEST, 'Not an image or video! Please upload only images or videos.') as any, false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // max 20MB
    },
});
