import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import Category from '../models/categoryModel.js';


// @desc Create new category
// @route POST /api/tasks
// @access Public
const getAllTasks = asyncHandler(async (req,res) => {
   const tasks = await Task.find().populate('category', 'name user').sort({date: 1});
   const userTasks = tasks.filter(task => task.category.user.toString() === req.user._id.toString());
   res.json(userTasks);
});

// @desc Get tasks
// @route POST /api/tasks/category/:category
// @access Public
const getTasks = asyncHandler(async (req,res) => {
   const tasks = await Task.find({category: req.params.category}).populate('category', 'user').sort({date: 1});
   const userTasks = tasks.filter(task => task.category.user.toString() === req.user._id.toString());
   res.json(userTasks);
});

// @desc Create new category
// @route POST /api/tasks/:category/task
// @access Public
const createTask = asyncHandler(async (req, res) => {
   const category = await Category.findById(req.params.category).populate('user', '_id');
   if(category) {
      if(category.user._id.toString() === req.user._id.toString()) {
         const {
            name,
            priority,
            date,
         } = req.body;
         const task = new Task({
            name,
            priority,
            date,
            category: category._id
         });
         const createdTask = await task.save();
         res.status(201).json(createdTask);
      } else {
         res.status(401);
         throw new Error('Você não tem permissão para modificar este projeto.')
      }
   } else {
      res.status(404);
      throw new Error('Projeto não encontrado.')
   }
});

// @desc    Get Task By ID
// @route   GET /api/tasks/:id
// @access  Public 
const getTask = asyncHandler( async (req, res) => {
   const task = await Task.findById(req.params.id).populate('category', 'name user');
   if(task) {
      if(task.category.user.toString() === req.user._id.toString()) {
         res.json(task);
      } else {
         res.status(401);
         throw new Error('Você não tem permissão para acessar essa página.')
      }
   } else {
      res.status(404);
      throw new Error('Tarefa não encontrada.');
   }
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public 
const deleteTask = asyncHandler( async (req, res) => {
   const task = await Task.findById(req.params.id).populate('category', 'user');
   if(task) {
      if(task.category.user.toString() === req.user._id.toString()) {
         await task.remove();
         res.json("Task excluída") 
      } else {
         res.status(401);
         throw new Error('Você não tem autorização para modificar esta tarefa.')
      }
   } else {
      res.status(404);
      throw new Error('Tarefa não encontrada');
   }
});

// @desc    Update task to complete
// @route   PUT /api/tasks/:id/complete
// @access  Public
const completedTask = asyncHandler(async (req, res) => {
   const task = await Task.findById(req.params.id).populate('category', 'user');
   if(task) {
      if(task.category.user.toString() === req.user._id.toString()) {
         task.completed = !task.completed;
         const updatedTask = await task.save();
         res.status(201).json(updatedTask);
      } else {
         res.status(401);
         throw new Error('Você não tem autorização para modificar esta tarefa.')
      }
   } else {
      res.status(404);
      throw new Error('Task not found!');
   }
}); 


// @desc    Update task to complete
// @route   PUT /api/tasks/:id/comment
// @access  Public
const commentTask = asyncHandler(async (req, res) => {
   const { comment } = req.body;

   const task = await Task.findById(req.params.id).populate('category', 'user');
   if(task) {
      if(task.category.user.toString() === req.user._id.toString()) {
         const newComment = {
            comment
         }
         task.comments.push(newComment);
         await task.save();
         res.status(201).json(newComment);
      } else {
         res.status(401);
         throw new Error('Você não tem autorização para modificar esta tarefa.')
      }
   } else {
      res.status(404);
      throw new Error('Tarefa não encontrada!');
   }
}); 


export { createTask, getAllTasks, getTasks, deleteTask, getTask, completedTask, commentTask };