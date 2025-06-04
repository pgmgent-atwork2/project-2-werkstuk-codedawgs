import { body } from "express-validator";
import User from "../../models/User.js";

export default [
  body("pincode")
    .notEmpty()
    .withMessage({ msg: "Pincode is required", code: "REQUIRED_PINCODE" })
    .bail()
    .matches(/^\d{4}$/)
    .withMessage({ msg: "Pincode is 4 digitis", code: "INVALID_PINCODE_FORMAT" }),
];