import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategory } from '../controllers/categoryController.js';
const router = express.Router({mergeParams: true});

router.route('/')
   .get(getCategories)
   .post(createCategory)

router.route('/:id')
   .get(getCategory)
   .delete(deleteCategory)


export default router;