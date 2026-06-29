export type UserRole = "manager" | "member";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}