import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";

const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;