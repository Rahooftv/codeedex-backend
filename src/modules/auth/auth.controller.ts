import { Request, Response } from "express";
import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: result,
  });
});

export const AuthController = {
  login,
};