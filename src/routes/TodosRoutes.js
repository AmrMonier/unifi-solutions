import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
} from "../controller/TodosController.js";
import {
  createTodoValidator,
  isValidObjectId,
  updateTodoValidator,
} from "../validators/todosValidators.js";

export const todoRouter = new Router();

todoRouter.post(
  "/",
  (req, res, next) => {
    const { title, user_id } = req.body;
    return createTodoValidator(title, user_id)
      ? next()
      : res.status(400).json({
          msg: "bad request invalid data",
          data: {
            title,
            user_id,
          },
        });
  },
  createTodo
);

todoRouter.get(
  "/:id",
  (req, res, next) => {
    const { id } = req.params;
    return isValidObjectId(id)
      ? next()
      : res.status(404).json({
          msg: "resource not found",
        });
  },
  getTodoById
);

todoRouter.delete(
  "/:id",
  (req, res, next) => {
    const { id } = req.params;
    return isValidObjectId(id)
      ? next()
      : res.status(404).json({
          msg: "resource not found",
        });
  },
  deleteTodo
);

todoRouter.put(
  "/:id",
  (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(404).json({
        msg: "resource not found",
      });
    const { title, status } = req.body;
    console.log(title, status);
    if (!updateTodoValidator(title, status))
      return res.status(400).json({
        msg: "bad request invalid data",
        data: {
          title,
          status,
        },
      });

    next();
  },
  updateTodo
);
