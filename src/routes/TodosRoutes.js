import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
} from "../controller/TodosController.js";
import {
  createTodoValidator,
  todoExistsValidator,
  updateTodoValidator,
} from "../validators/todosValidators.js";

export const todoRouter = new Router();

todoRouter.post("/", createTodoValidator, createTodo);

todoRouter.get("/:id", todoExistsValidator, getTodoById);

todoRouter.delete("/:id", todoExistsValidator, deleteTodo);

todoRouter.put("/:id", updateTodoValidator, updateTodo);
