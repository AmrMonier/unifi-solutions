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
import { isAuthenticated } from "../middlewares/authenticated.js";

export const todoRouter = new Router();

todoRouter.post("/", isAuthenticated, createTodoValidator, createTodo);

todoRouter.get("/:id", isAuthenticated, todoExistsValidator, getTodoById);

todoRouter.delete("/:id", isAuthenticated, todoExistsValidator, deleteTodo);

todoRouter.put("/:id", isAuthenticated, updateTodoValidator, updateTodo);
