import { connect } from "mongoose";
import { config } from "dotenv";
import UserFactory from "./factories/usersFactory.js";
config();
connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('connected');
    // register your factories here
    await UserFactory(5);
    process.exit(0)
  })
  .catch((err) => {
    console.error("failed to connect to db", err);
    process.exit(1)
  });
