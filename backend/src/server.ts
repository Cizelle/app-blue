import app from './app';
import { env } from './config/env.config';
import prisma from './utils/prisma';

const PORT = env.port || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            prisma.$disconnect();
            process.exit(1);
        });
    } else {
        prisma.$disconnect();
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: Error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});