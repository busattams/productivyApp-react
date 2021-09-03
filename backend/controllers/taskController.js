import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';


// @desc Create new category
// @route POST /api/tasks
// @access Public
const getAllTasks = asyncHandler(async (req,res) => {
   const tasks = await Task.find().populate('category', 'name');
   res.json(tasks);
});

// @desc Get tasks
// @route POST /api/tasks/:category
// @access Public
const getTasks = asyncHandler(async (req,res) => {
   const tasks = await Task.find({category: req.params.category}).sort({date: 1});
   res.json(tasks);
});




// @desc Create new category
// @route POST /api/tasks/:category/task
// @access Public
const createTask = asyncHandler(async (req, res) => {
   const {
      name,
      priority,
      date,
      completed
   } = req.body;
   const task = new Task({
      name,
      priority,
      date,
      completed,
      category: req.params.category
   });
   const createdTask = await task.save();
   res.status(201).json(createdTask);
});


// @desc    Get Task By ID
// @route   GET /api/tasks/:id
// @access  Public 
const getTask = asyncHandler( async (req, res) => {
   const task = await Task.findById(req.params.id).populate('category', 'name');
   if(task) {
      res.json(task)
   } else {
      res.status(404);
      throw new Error('Task not found!');
   }
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public 
const deleteTask = asyncHandler( async (req, res) => {
   const task = await Task.findById(req.params.id);
   if(task) {
      await task.remove();
      res.json("Task removed")
   } else {
      res.status(404);
      throw new Error('Task not found!');
   }
});

// @desc    Update task to complete
// @route   PUT /api/tasks/:id/complete
// @access  Public
const completedTask = asyncHandler(async (req, res) => {
   const task = await Task.findById(req.params.id);
   if(task) {
      task.completed = !task.completed;

      const updatedTask = await task.save();
      res.status(201).json(updatedTask);
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

   const task = await Task.findById(req.params.id);
   if(task) {
      const newComment = {
         comment
      }

      task.comments.push(newComment);
      
     await task.save();

      res.status(201).json(newComment);
   } else {
      res.status(404);
      throw new Error('Task not found!');
   }
}); 


export { createTask, getAllTasks, getTasks, deleteTask, getTask, completedTask, commentTask };