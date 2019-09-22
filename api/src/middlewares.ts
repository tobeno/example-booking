import { ErrorRequestHandler, NextFunction, RequestHandler } from "express";
import { Request, Response } from "express";

export const asyncMiddleware = (fn: RequestHandler): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const errorHandler = (): ErrorRequestHandler => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (err, req: Request, res: Response, next: NextFunction): void => {
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
