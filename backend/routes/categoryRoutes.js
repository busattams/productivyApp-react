import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategory } from '../controllers/categoryController.js';
const router = express.Router({mergeParams: true});
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
   .get(protect, getCategories)
   .post(protect, createCategory)

router.route('/:id')
   .get(protect, getCategory)
   .delete(protect, deleteCategory)


export default router;