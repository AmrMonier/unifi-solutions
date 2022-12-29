import { Todo } from "../models/Todo.js";

export const createTodo = async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.create({ title, user: req.user._id });
  return res.status(201).json({ data: todo });
};

export const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo)
    return res.status(404).json({
      msg: "resource not found",
    });
  return res.json({ data: todo });
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
  if (!todo)
    return res.status(404).json({
      msg: "resource not found",
    });
  return res.status(204).json({ data: todo });
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOne({ _id: id, user: req.user._id });
  if (!todo)
    return res.status(404).json({
      msg: "resource not found",
    });
  const { title, status } = req.body;
  (todo.title = title), (todo.status = status);
  await todo.save();
  return res.json({ data: todo });
};

export const getAllUserTodos = async (req, res) => {
  const todos = await Todo.find({
    user: req.user.id,
  });
  return res.json({ data: todos });
};
