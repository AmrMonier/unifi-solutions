import { Types } from "mongoose";
import {
  exists,
  isValidObjectId,
  SendError,
  isNotEmpty,
} from "../utilis/validatorHelpers.js";

import { Todo } from "../models/Todo.js";

export const createTodoValidator = (req, res, next) => {
  const { title } = req.body;
  const errors = [];
  if (!isNotEmpty(title))
    errors.push({ field: "title", value: title, msg: "required field" });

  if (errors.length !== 0) return SendError(res, 400, errors);
  next();
};

export const updateTodoValidator = (req, res, next) => {
  const { id } = req.params;
  if (
    !exists(Todo.collection.name, {
      _id: Types.ObjectId(id),
    })
  )
    return res.status(404).json({ msg: "resource not found" });
  const { title, status } = req.body;
  const errefarors = [];
  if (title && !isNotEmpty(title))
    errors.push({
      field: "title",
      value: title,
      msg: "title can't be white spaces",
    });
  let supportedStatus = ["todo", "inprogress", "done"];
  if (isNotEmpty(status) && !supportedStatus.includes(status)) {
    errors.push({
      field: "status",
      value: status,
      msg:
        "unsupported value, allowed values are " + supportedStatus.join(", "),
    });
  }

  if (errors.length !== 0) return SendError(res, 400, errors);
  next();
};

export const todoExistsValidator = (req, res, next) => {
  const { id } = req.params;
  if (
    !exists(Todo.collection.name, {
      _id: Types.ObjectId(id),
    })
  )
    return res.status(404).json({ msg: "resource not found" });
  next();
};
