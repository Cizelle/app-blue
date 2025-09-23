import express from 'express';
import * as userController from '../controllers/user.controller';
import { protect } from '../../middleware/auth.middleware';

const router = express.Router();

// All routes below this are protected
router.use(protect);

router.route('/me')
    .get(userController.getProfile)
    .patch(userController.updateProfile);

export default router;