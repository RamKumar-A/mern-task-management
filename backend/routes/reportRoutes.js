import express from 'express';
import { adminOnly, protect } from '../middlewares/authMiddleware.js';
import {
  exportTasksReport,
  exportUsersReport,
} from '../controllers/reportController.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/export/tasks', exportTasksReport); //Export all tasks as Excel/PDF
router.get('/export/users', exportUsersReport); //Export user-task report

export default router;
