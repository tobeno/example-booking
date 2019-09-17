import { ErrorRequestHandler, RequestHandler } from "express";
import { Request, Response } from "express";

export const errorHandler = (): ErrorRequestHandler => {
  return (err: any, req: Request, res: Response, next: NextFunction): void => {
    res.status(500);
    res.json({
      status: 500,
      message: err instanceof Error ? err.message : err.toString(),
    });
  };
};

export const notFoundHandler = (): RequestHandler => {
  return (req: Request, res: Response): void => {
    res.status(404);
    res.json({
      status: 404,
      message: `Path ${req.path} not found.`,
    });
  };
};
