import { Types } from "mongoose";
export const createTodoValidator = (title, user_id) => {
  return (
    isNotEmpty(title) && isNotEmpty(user_id) && Types.ObjectId.isValid(user_id)
  );
};

function isNotEmpty(value) {
  return value && value.trim() !== "" ? true : false;
}
