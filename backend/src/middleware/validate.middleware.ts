import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import { AppError } from '../utils/AppError';

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = Joi.compile(schema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(req.body); // <-- validate only the body

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
    }

    // Replace req.body with validated value
    req.body = value;

    return next();
};

export default validate;