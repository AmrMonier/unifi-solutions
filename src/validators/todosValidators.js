import mongoose from "mongoose";

const { Types, connection } = mongoose;
import { User } from "../models/User.js";
import { Todo } from "../models/Todo.js";

export const createTodoValidator = (req, res, next) => {
  const { title, user_id } = req.body;
  const errors = [];
  if (!isNotEmpty(title))
    errors.push({ field: "title", value: title, msg: "required field" });
  if (!isValidObjectId(user_id)) {
    errors.push({ field: "user_id", value: user_id, msg: "required field" });
  }

  if (!exists(User.collection.name, { _id: Types.ObjectId(user_id) })) {
    errors.push({
      field: "user_id",
      value: user_id,
      msg: "user doesn't exist",
    });
  }
  if (errors.length !== 0) return SendError(res, 400, errors);
  next();
};

function SendError(res, status, data) {
  return res.status(status).json(data);
}
function isNotEmpty(value) {
  return value && value.trim() !== "" ? true : false;
}

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

const isValidObjectId = (id) => {
  return isNotEmpty(id) && Types.ObjectId.isValid(id);
};

async function exists(name, condition) {
  const collection = connection.db.collection(name);
  const doc = await collection.findOne(condition);
  return doc ? true : false;
}
