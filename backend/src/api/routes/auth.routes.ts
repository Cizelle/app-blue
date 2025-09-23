import express from 'express';
import * as authController from '../controllers/auth.controller';
import authValidation from '../validations/auth.validation';
import validate from '../../middleware/validate.middleware';
import { upload } from '../../middleware/file.middleware';

const router = express.Router();

// Accept three file fields: profile photo, ID proof, authorization letter
const registerUploads = upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'id_proof_document', maxCount: 1 },
    { name: 'authorization_letter', maxCount: 1 },
]);

router.post(
    '/register',
    registerUploads,
    validate(authValidation.register.body),
    authController.register,
);

router.post('/login', validate(authValidation.login.body), authController.login);

export default router;
