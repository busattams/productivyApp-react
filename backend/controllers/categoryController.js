import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Task from '../models/taskModel.js';

// @desc List categories
// @route GET /api/category
// @access Public
const getCategories = asyncHandler(async (req, res) => {
   const categories = await Category.find();
   res.json(categories)
});

// @desc Create new category
// @route POST /api/category
// @access Public
const createCategory = asyncHandler(async (req, res) => {
   const category = new Category({
      name: req.body.category
   }); 
   const createdCategory = await category.save();
   res.status(201).json(createdCategory);
});

// @desc    Delete product
// @route   GET /api/category/:id
// @access  Public 
const getCategory = asyncHandler( async (req, res) => {
   const category = await Category.findById(req.params.id);
   if(category) {
      res.json(category)
   } else {
      res.status(404);
      throw new Error('Category not found!');
   }
});


// @desc    Delete product
// @route   DELETE /api/category/:id
// @access  Public 
const deleteCategory = asyncHandler( async (req, res) => {
   const category = await Category.findById(req.params.id);
   if(category) {
      await category.remove();
      res.json("Category removed")
   } else {
      res.status(404);
      throw new Error('Category not found!');
   }
});




export { createCategory, getCategories, deleteCategory, getCategory };