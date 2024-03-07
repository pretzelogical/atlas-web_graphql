const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  projectId: String,
  title: String,
  weight: Number,
  description: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
