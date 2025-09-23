import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.config';
import { AppError } from '../utils/AppError';
import prisma from '../utils/prisma';

// Extend the Request type to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError(httpStatus.UNAUTHORIZED, 'You are not logged in. Please log in to get access.'));
    }

    try {
        const decoded: any = jwt.verify(token, env.jwt.secret);

        const currentUser = await prisma.users.findUnique({
            where: { user_id: decoded.sub },
        });

        if (!currentUser) {
            return next(new AppError(httpStatus.UNAUTHORIZED, 'The user belonging to this token does no longer exist.'));
        }

        // Grant access to protected route
        req.user = currentUser;
        next();
    } catch (error) {
        return next(new AppError(httpStatus.UNAUTHORIZED, 'Invalid token. Please log in again.'));
    }
};

export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError(httpStatus.FORBIDDEN, 'You do not have permission to perform this action.'));
        }
        next();
    };
};