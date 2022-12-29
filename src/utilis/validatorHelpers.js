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
