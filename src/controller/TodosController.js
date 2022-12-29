import { Todo } from "../models/Todo.js";

export const createTodo = async (req, res) => {
  const { title, user_id } = req.body;
  const todo = await Todo.create({ title, user: user_id });
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
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo)
    return res.status(404).json({
      msg: "resource not found",
    });
  return res.status(204).json({ data: todo });
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
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
  const { id } = req.query;
  const todos = await Todo.find({
    user: id,
  });
  return res.json({ data: todos });
};
