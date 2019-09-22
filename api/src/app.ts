import express, { Application } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { createRouter } from "./router";
import { errorHandler, notFoundHandler } from "./middlewares";
import { Services } from "./services";

const rootPath = path.resolve(__dirname, "..");

export function createApp(services: Services): Application {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.use(express.static(`${rootPath}/public`));

  app.use("/v1", createRouter(services));

  app.get("*", notFoundHandler());
  app.use(errorHandler());

  return app;
}
