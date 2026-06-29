import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import { env } from "../../config/env";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["manager", "member"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(
    this.password,
    env.BCRYPT_SALT_ROUNDS
  );
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;