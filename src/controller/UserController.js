import { compareSync, hash } from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password: await hash(password, 10),
  });

  return res.json({
    data: {
      user,
      token: generateToken({ name: user.name, email: user.email }),
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  console.log(user.password, password)
  if (!user || !password || !compareSync(password, user.password))
    return res.status(401).json({
      msg: "wrong email or password",
    });
  return res.json({
    data: {
      user,
      token: generateToken({ name: user.name, email: user.email }),
    },
  });
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.APP_SECRET);
}
