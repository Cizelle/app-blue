import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import httpStatus from 'http-status';
import rateLimit from 'express-rate-limit';
import { AppError } from './utils/AppError';
import apiRoutes from './api/routes';
import { env } from './config/env.config';

const app: Express = express();

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable cors
app.use(cors());
app.options(/.*/, cors());

// HTTP request logger
if (env.nodeEnv !== 'production') {
    app.use(morgan('dev'));
}

// Limit repeated requests to public APIs
if (env.nodeEnv === 'production') {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use('/api', limiter);
}

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send('Ocean Hazard Reporting API is live! 🌊');
});

// v1 api routes
app.use('/api/v1', apiRoutes);

// Send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Ensure numeric status code
    const statusCode: number = err.statusCode || err.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message: string =
        env.nodeEnv === 'production' && !err.isOperational
            ? 'Internal Server Error'
            : err.message || 'Internal Server Error';

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(env.nodeEnv === 'development' && { stack: err.stack }),
    };

    if (env.nodeEnv === 'development') {
        console.error(err);
    }

    res.status(statusCode).send(response);
});

export default app;