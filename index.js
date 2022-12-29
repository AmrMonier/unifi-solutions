import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { todoRouter } from "./src/routes/TodosRoutes.js";

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error("failed to connect to db", err);
  });

const app = new express();
// register third-party packages
app.use(cors());
app.use(bodyParser.json());

// register routes
app.use('/todos', todoRouter)
// register middlewares

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log();
  console.log(`App is up and running on http://localhost:${PORT}`);
});
