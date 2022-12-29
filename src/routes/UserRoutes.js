import { Router } from "express";
import { getAllUserTodos } from "../controller/TodosController.js";
import { isValidObjectId } from "../validators/todosValidators.js";

export const userRoutes = new Router();

userRoutes.get(
  "/todos",
  (req, res, next) => {
    const { id } = req.query;
    isValidObjectId(id)
      ? next()
      : res.status(400).json({
          msg: "bad request invalid data",
          data: {
            id,
          },
        });
  },
  getAllUserTodos
);
