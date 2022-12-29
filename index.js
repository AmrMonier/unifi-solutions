import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { todoRouter } from "./src/routes/TodosRoutes.js";
import { userRoutes } from "./src/routes/UserRoutes.js";

import { errorHandler } from "./src/middlewares/errorHandler.js";

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
app.use("/todos", todoRouter);

app.use("/user", userRoutes);

// register middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`App is up and running on http://localhost:${PORT}`);
});
