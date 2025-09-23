import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as reportService from '../services/report.service';
import { MediaData } from '../types';

type AuthRequest = Request & { user?: { user_id: number;[key: string]: any } };

// Utility to wrap async handlers
const catchAsync =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };

export const createReport = catchAsync(
    async (req: AuthRequest, res: Response) => {
        if (!req.user?.user_id) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .send({ message: 'User not authenticated' });
        }

        // Build report payload
        const reportData = {
            ...req.body,
            user_id: req.user.user_id,
        };

        // Multer-parsed files
        const files = (req.files as Express.Multer.File[]) || [];

        // Convert to our MediaData[]
        const mediaFiles: MediaData[] = files.map((file) => ({
            media_type: file.mimetype.startsWith('image') ? 'Image' : 'Video',
            // In prod replace with your storage URL returned by file.service
            file_path: `uploads/placeholder/${file.originalname}`,
        }));

        const report = await reportService.createHazardReport(
            reportData,
            mediaFiles,
        );
        res.status(httpStatus.CREATED).send(report);
    },
);

export const getReports = catchAsync(async (_req: AuthRequest, res: Response) => {
    const reports = await reportService.getAllReports(_req.query);
    res.status(httpStatus.OK).send(reports);
});

export const validateReport = catchAsync(
    async (req: AuthRequest, res: Response) => {
        if (!req.user?.user_id) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .send({ message: 'User not authenticated' });
        }
        const reportId = parseInt(req.params.id, 10);
        const validatorId = req.user.user_id;

        const validated = await reportService.validateReport(
            reportId,
            validatorId,
        );
        res.status(httpStatus.OK).send(validated);
    },
);
