import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.APP_SECRET);
    const user = await User.findOne({ email: payload.email });
    if (!user) return res.status(401).json({ msg: "unauthorized" });
    req.user = user;
  } catch (error) {
    return res.status(401).json({ msg: "unauthorized" });
  }

  next();
};
