import express, { Application } from "express";
import path from "path";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares";

const rootPath = path.resolve(__dirname, "..");

export function createApp(): Application {
  const app = express();

  app.use(cors());

  app.use(express.static(`${rootPath}/public`));

  app.get("*", notFoundHandler());
  app.use(errorHandler());

  return app;
}
