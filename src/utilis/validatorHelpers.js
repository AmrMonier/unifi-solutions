import mongoose from "mongoose";
const { Types, connection } = mongoose;

export const isValidObjectId = (id) => {
  return isNotEmpty(id) && Types.ObjectId.isValid(id);
};

export async function exists(name, condition) {
  const collection = connection.db.collection(name);
  const doc = await collection.findOne(condition);
  return doc ? true : false;
}
export function SendError(res, status, data) {
  return res.status(status).json(data);
}

export function isNotEmpty(value) {
  return value && value.trim() !== "" ? true : false;
}
