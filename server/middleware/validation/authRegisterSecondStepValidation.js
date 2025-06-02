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

  body("pincode")
    .notEmpty()
    .withMessage({ msg: "Pincode is required", code: "REQUIRED_PINCODE" })
    .bail()
    .matches(/^\d{4}$/)
    .withMessage({ msg: "Pincode must be exactly 4 digits", code: "INVALID_PINCODE_FORMAT" }),

  body("image_id")
    .notEmpty()
    .withMessage({ msg: "Image is required", code: "REQUIRED_PICTURE" })
    .bail()
    .isInt({ min: 1, max: 16 })
    .withMessage({ msg: "You must select a picture", code: "INVALID_PICTURE_FORMAT" }),
];