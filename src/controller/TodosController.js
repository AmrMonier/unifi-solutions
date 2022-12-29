import { Todo } from "../models/Todo.js";
export const createTodo = async (req, res) => {
  const { title, user_id } = req.body;
  const todo = await Todo.create({ title, user: user_id });
  return res.status(201).json({ data: todo });
};
