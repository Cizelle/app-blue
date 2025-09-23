import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as authService from '../services/auth.service';
import * as tokenService from '../services/token.service';

const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export const register = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const user = await authService.registerUser(req.body, files);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const { identifier, password } = req.body;
    const user = await authService.loginUser(identifier, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});