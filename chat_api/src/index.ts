import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";
import config from "./config";
import CustomError from "./utils/error/CustomError";
import { chatRoute } from "./routes";
import errorController from "./controllers/error.controller";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes before wildcard route
app.post("/yayi", (req, res) => {
  return res.json({ name: "yayi" });
});

app.use("/api/v1/chats", chatRoute);

// Handle undefined routes
app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

// Global error handler
app.use(errorController);

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occurred! Shutting down...");
  process.exit(1);
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
