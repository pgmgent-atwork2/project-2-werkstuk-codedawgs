import { validationResult } from "express-validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const users = await User.query().select("*");

  const input = {
    name: "pincode",
    label: "Pincode",
    type: "number",
    value: req.body?.pincode ? req.body.pincode : "",
    err: req.formErrorFields?.pincode ? req.formErrorFields["pincode"] : "",
  };

  const flash = req.flash || {};
  
  res.render("pages/login", {
    layout: "layouts/authentication",
    users,
    input,
    flash,
    title: "Login",
  });
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach((error) => {
            req.formErrorFields[error.path] = error.msg
        });

        req.flash = {
            type: "danger",
            message: "er zijn fouten",
        }

        return next();
    }

    const user = await User.query().findOne({
      first_name: req.body.first_name,
    });

    if (!user) {
        req.formErrorFields = { first_name: "user does not exist" };
        req.flash = { type: "danger", message: "errors" };
        return next();
    }

    if (req.body.pincode !== user.pincode) {
        req.formErrorFields = { pincode: "invalid pincode" };
        req.flash = { type: "danger", message: "errors" };
        return next();
    }

    const userToken = jwt.sign(
      { userId: user.id, },
      process.env.TOKEN_SALT,
      { expiresIn: '1h' });

    res.cookie("userToken", userToken, { httpOnly: true });
    res.redirect('/')
  } catch (e) {
    console.error(e);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect('/login');
};