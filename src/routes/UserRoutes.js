import { Router } from "express";
import { getAllUserTodos } from "../controller/TodosController.js";
import { login, signup } from "../controller/UserController.js";
import {
  signupValidator,
  userExistsValidator,
} from "../validators/userValidators.js";

export const userRoutes = new Router();

userRoutes.get("/todos", userExistsValidator, getAllUserTodos);

userRoutes.post("/signup", signupValidator, signup);
userRoutes.post("/login", login);
