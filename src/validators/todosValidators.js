import { Types } from "mongoose";
export const createTodoValidator = (title, user_id) => {
  return isNotEmpty(title) && isValidObjectId(user_id);
};

function isNotEmpty(value) {
  return value && value.trim() !== "" ? true : false;
}

export const isValidObjectId = (id) => {
  return isNotEmpty(id) && Types.ObjectId.isValid(id);
};
