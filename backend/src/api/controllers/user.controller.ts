import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as userService from '../services/user.service';

const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export const getProfile = catchAsync(async (req: Request, res: Response) => {
    // User is attached to req by the 'protect' middleware
    res.status(httpStatus.OK).send(req.user);
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const updatedUser = await userService.updateUserProfile(req.user.user_id, req.body);
    res.status(httpStatus.OK).send(updatedUser);
});