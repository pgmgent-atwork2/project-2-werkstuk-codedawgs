import User from "../../models/User.js";

export const users = async (req, res, next) => {
  const users = await User.query();
  res.json(users);
};