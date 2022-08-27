import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import { config } from "./config/config";
import auth from "./routes/auth";
import users from "./routes/users";
import morgan from "morgan";
import posts from "./routes/posts";
import authUser from "./middlewares/authUser";

const app: Application = express();

// DB CONNECTION
mongoose.connect(config.db.url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("open", console.log.bind(console, "Connection successful"));

// MIDDLEWARES
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

// ROUTES MIDDLEWARES
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", authUser, users);
app.use("/api/v1/posts", authUser, posts);

app.listen(config.app.port, () =>
  console.log("Server is running on: http://localhost:" + config.app.port)
);
