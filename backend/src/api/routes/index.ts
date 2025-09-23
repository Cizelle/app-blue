import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import reportRoutes from './report.routes';

const router = express.Router();

const defaultRoutes = [
    { path: '/auth', route: authRoutes },
    { path: '/users', route: userRoutes },
    { path: '/reports', route: reportRoutes },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;