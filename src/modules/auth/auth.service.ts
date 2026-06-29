import bcrypt from "bcrypt";
import User from "../user/user.model";
import AppError from "../../utils/AppError";
import { generateToken } from "../../utils/jwt";
import { env } from "../../config/env";

const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isMatched) {
    throw new AppError("Invalid credentials", 401);
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

    const accessToken = generateToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES_IN as any
    );

  user.password = "";

  return {
    accessToken,
    user,
  };
};

export const AuthService = {
  loginUser,
};