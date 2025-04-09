import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'member' }).select('-password');

    // Add task counts to each user
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: 'Pending',
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: 'In Progress',
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: 'Completed',
        });

        return {
          ...user._doc,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );

    res.status(200).json(usersWithTaskCounts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin

// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Delete all tasks associated with the user
//     await Task.deleteMany({ user: req.params.id });

//     await user.remove();
//     res.status(200).json({ message: 'User removed' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };
