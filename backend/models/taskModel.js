import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', 
      required: true
   },
   name: {type: String, required: true},
   priority: {type: String},
   date: {type: Date},
   completed: {type: Boolean, default: false},
   comments: [
      {
         comment: {type: String, required: true},
         date:{type: Date, default: Date.now}
      }
   ]
}, {
   timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;