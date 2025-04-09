import express from 'express';
import { adminOnly, protect } from '../middlewares/authMiddleware.js';
import { getUserById, getUsers } from '../controllers/userController.js';

const router = express.Router();

// User Management Routes
router.use(protect);
router.get('/:id', getUserById); //Get specific user

router.use(adminOnly); //Admin only routes

router.get('/', getUsers); //Get all users (admin only)

// router.delete('/:id', deleteUser); //Delete user (admin only)

export default router;
