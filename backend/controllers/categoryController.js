import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

// @desc List categories
// @route GET /api/category
// @access Private
const getCategories = asyncHandler(async (req, res) => {
   const categories = await Category.find({ user: req.user._id });
   res.json(categories)
});

// @desc Create new category
// @route POST /api/category
// @access Public
const createCategory = asyncHandler(async (req, res) => {
   const category = new Category({
      user: req.user._id,
      name: req.body.category
   }); 
   const createdCategory = await category.save();
   res.status(201).json(createdCategory);
});

// @desc    Delete category
// @route   GET /api/category/:id
// @access  Public 
const getCategory = asyncHandler( async (req, res) => {
   const category = await Category.findById(req.params.id);
   if(category) {
      if(category.user.toString() === req.user._id.toString()) {
         res.json(category)
      } else {
         res.status(401);
         throw new Error("Você não tem permissão para acessar este projeto.");
      }
   } else {
      res.status(404);
      throw new Error('Projeto não encontrado!');
   }
});


// @desc    Delete product
// @route   DELETE /api/category/:id
// @access  Public 
const deleteCategory = asyncHandler( async (req, res) => {
   const category = await Category.findById(req.params.id);
   if(category) {
      if(category.user.toString() === req.user._id.toString()) {
         await category.remove();
         res.json('Projeto deletado com sucesso.')
      } else {
         res.status(401);
         throw new Error("Você não tem permissão para deletar este projeto.");
      }
   } else {
      res.status(404);
      throw new Error('Projeto não encontrado.');
   }
});




export { createCategory, getCategories, deleteCategory, getCategory };