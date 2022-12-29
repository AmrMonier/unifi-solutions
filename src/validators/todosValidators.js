import { Types } from "mongoose";
export const createTodoValidator = (title, user_id) => {
  return isNotEmpty(title) && isValidObjectId(user_id);
};

function isNotEmpty(value) {
  return value && value.trim() !== "" ? true : false;
}
export const updateTodoValidator = (title, status) => {
  let safe = true;
  if (isNotEmpty(status)) {
    safe = ["todo", "inprogress", "done"].includes(status);
  }
  if (title) if (title.trim() === "") safe = false;
  console.log(safe);
  console.log(["todo", "inprogress", "done"].includes(status));
  return safe;
};
export const isValidObjectId = (id) => {
  return isNotEmpty(id) && Types.ObjectId.isValid(id);
};
