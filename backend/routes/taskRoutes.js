import express from 'express';
import { commentTask, completedTask, createTask, deleteTask, getAllTasks, getTask, getTasks } from '../controllers/taskController.js';
const router = express.Router({mergeParams: true});
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
   .get(protect, getAllTasks)
   
router.route('/category/:category')
   .get(protect, getTasks)

router.route('/:id')
   .get(protect, getTask)
   .delete(protect, deleteTask)

router.route('/:id/complete')
   .patch(protect, completedTask)

router.route('/:id/comment')
   .patch(protect, commentTask)

router.route('/:category/new')
   .post(protect, createTask);

export default router;