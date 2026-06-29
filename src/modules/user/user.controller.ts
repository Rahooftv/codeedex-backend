import { Request, Response } from "express";
import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { UserService } from "./user.service";

const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllMembers();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Members retrieved successfully",
    data: result,
  });
});

export const UserController = {
  getAllMembers,
};