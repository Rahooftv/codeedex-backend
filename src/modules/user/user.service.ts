import User from "./user.model";

const getAllMembers = async () => {
  const members = await User.find(
    { role: "member" },
    {
      password: 0,
    }
  );

  return members;
};

export const UserService = {
  getAllMembers,
};