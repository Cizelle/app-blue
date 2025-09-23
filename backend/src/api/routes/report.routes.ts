import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { upload } from '../../middleware/file.middleware';
import {
    createReport,
    getReports,
    validateReport,
} from '../controllers/report.controller';

const router = Router();

router.use(protect);

// POST /api/v1/reports
//   • JWT-protected
//   • accepts up to 5 files under field name “media”
router.post(
    '/',
    upload.array('media', 5),
    createReport,
);

// GET /api/v1/reports
//   • list all reports (with media & reporter info)
router.get('/', getReports);

// PATCH /api/v1/reports/:id/validate
//   • mark a report as validated by the current user
router.patch('/:id/validate', validateReport);

export default router;
