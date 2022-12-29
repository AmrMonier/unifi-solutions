import { Types } from "mongoose";
import { User } from "../models/User.js";
import { SendError, exists, isNotEmpty } from "../utilis/validatorHelpers.js";

export const userExistsValidator = async (req, res, next) => {
  const { id } = req.query;

  if (
    !(await exists(User.collection.name, {
      _id: Types.ObjectId(id),
    }))
  )
    return SendError(res, 404, { msg: "resource not found" });
  next();
};

export const signupValidator = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = [];
  if (!isNotEmpty(name))
    errors.push({ field: "name", value: name, msg: "name field is required" });

  if (!isNotEmpty(email))
    errors.push({
      field: "email",
      value: email,
      msg: "email field is required",
    });

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email && !email.match(emailRegex))
    errors.push({ field: "email", value: email, msg: "invalid email" });

  if (await exists(User.collection.name, { email })) {
    errors.push({
      field: "email",
      value: email,
      msg: "4+ email already exists",
    });
  }

  if (!isNotEmpty(password))
    errors.push({
      field: "password",
      value: password,
      msg: "password field is required",
    });

  if (password && password.length < 8)
    errors.push({
      field: "password",
      value: undefined,
      msg: "password must be at least 8 characters",
    });
  if (errors.length) return SendError(res, 400, errors);
  next();
};
