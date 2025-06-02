import { body } from "express-validator";
import User from "../../models/User.js";

export default [
  body("token")
    .notEmpty()
    .withMessage({ msg: "Token is required", code: "REQUIRED_TOKEN" })
    .bail()
    .custom(async (value) => {
      const user = await User.query().findOne({ token: value });
      if (!user) {
        throw new Error("Invalid token");
      }
      return true;
    })
    .withMessage({ msg: "Token is invalid", code: "REQUIRED_TOKEN" }),
];