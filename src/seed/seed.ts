import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../modules/user/user.model";
import { IUser } from "../modules/user/user.interface";

const users: Partial<IUser>[] = [
  {
    name: "Manager",
    email: "manager@gmail.com",
    password: "123456",
    role: "manager",
  },
  {
    name: "Member One",
    email: "member1@gmail.com",
    password: "123456",
    role: "member",
  },
  {
    name: "Member Two",
    email: "member2@gmail.com",
    password: "123456",
    role: "member",
  },
];

const seedUsers = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI!);

    await User.deleteMany({}); 

    for (const user of users) {
    await User.create(user);
    }

    console.log("Users seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();