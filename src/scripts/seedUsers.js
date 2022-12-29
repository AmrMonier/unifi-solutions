import {connect} from "mongoose"
import { config } from "dotenv";
config()
connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error("failed to connect to db", err);
  });

import { User } from "../models/User.js"

User.insertMany([
  {
    name: "amr Monier",
    email: "amr@test.com",
    password:
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  },
  {
    name: "Amira Monier",
    email: "amira@test.com",
    password:
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  },
  {
    name: "Radwa Monier",
    email: "radwa@test.com",
    password:
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  },
]).then((e, data) => {
    console.log(e, data)
});
