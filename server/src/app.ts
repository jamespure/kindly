import express, { Application } from "express";
import { config } from "./config/config";

const app: Application = express();

app.listen(config.app.port, () =>
  console.log("Server is running on: http://localhost:" + config.app.port)
);
