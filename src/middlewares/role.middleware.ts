import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const authorize = (...roles: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to access this resource", 403)
      );
    }

    next();
  };
};

export default authorize;