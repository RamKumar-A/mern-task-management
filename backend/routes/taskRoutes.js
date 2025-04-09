import express from 'express';
import {
  createTask,
  deleteTask,
  getDashboardData,
  getTaskById,
  getTasks,
  getUserDashboardData,
  updateTask,
  updateTaskChecklist,
  updateTaskStatus,
} from '../controllers/taskController.js';
import { adminOnly, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Task Management Routes

router.use(protect);
router.get('/dashboard-data', getDashboardData);
router.get('/user-dashboard-data', getUserDashboardData);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.put('/:id/status', updateTaskStatus);
router.put('/:id/todo', updateTaskChecklist);

router.use(adminOnly);
router.post('/', createTask);
router.delete('/:id', deleteTask);

export default router;
