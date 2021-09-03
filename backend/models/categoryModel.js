import mongoose from 'mongoose';
import Task from '../models/taskModel.js';

const categorySchema = mongoose.Schema({
   name: {type: String, required: true},
}, {
   timestamps: true
});

categorySchema.pre('remove', async function(next) {
   await Task.deleteMany({category: this._id});
   next();
});


const Category = mongoose.model('Category', categorySchema);

export default Category;