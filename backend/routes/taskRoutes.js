import express from 'express';
import { commentTask, completedTask, createTask, deleteTask, getAllTasks, getTask, getTasks } from '../controllers/taskController.js';
const router = express.Router({mergeParams: true});

router.route('/')
   .get(getAllTasks)
   
router.route('/category/:category')
   .get(getTasks)

router.route('/:id')
   .get(getTask)
   .delete(deleteTask)

router.route('/:id/complete')
   .put(completedTask)

router.route('/:id/comment')
   .put(commentTask)

router.route('/:category/task')
   .post(createTask);

export default router;