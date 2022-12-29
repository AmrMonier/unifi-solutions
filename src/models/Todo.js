import {Schema, model, Types} from 'mongoose'
const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'done'],
    default: 'todo'
  },
  user: {
    type: Types.ObjectId,
    ref: 'User'
  }
  
});
export const Todo = model("Todo", todoSchema);
