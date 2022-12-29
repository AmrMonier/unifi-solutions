import { Router } from "express";
import { createTodo } from "../controller/TodosController.js";
import { createTodoValidator } from "../validators/todosValidators.js";

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
