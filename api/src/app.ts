import express, { Application, Request, Response } from "express";
import path from "path";

const rootPath = path.resolve(__dirname, "..");

export function createApp(): Application {
  const app = express();

  app.use(express.static(`${rootPath}/public`));

  app.get("/test", (req: Request, res: Response): void => {
    res.json({ example: "test" });
  });

  return app;
}
