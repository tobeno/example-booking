import express, { Application } from "express";
import path from "path";
import cors from "cors";
import router from "./router";
import { errorHandler, notFoundHandler } from "./middlewares";

const rootPath = path.resolve(__dirname, "..");

export function createApp(): Application {
  const app = express();

  app.use(cors());

  app.use(express.static(`${rootPath}/public`));

  app.use("/v1", router);

  app.get("*", notFoundHandler());
  app.use(errorHandler());

  return app;
}
