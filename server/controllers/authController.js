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
      { expiresIn: '10h' });

    res.cookie("userToken", userToken, { httpOnly: true });
    res.redirect('/')
  } catch (e) {
    console.error(e);
  }
};


// Register

export const registerFirstStep = async (req, res) => {
  const input = {
      name: "token",
      label: "Token",
      type: "text",
      value: req.body?.token ? req.body.token : "",
      err: req.formErrorFields?.token ? req.formErrorFields["token"] : "",
  }
  const flash = req.flash || {};

  res.render("pages/register-first-step", {
    layout: "layouts/authentication",
    input,
    flash,
    title: "Enter Token",
  });
};

export const postRegisterFirstStep = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      req.flash = {
        type: "danger",
        message: "Er zijn fouten opgetreden",
      };

      return next();
    } else {
      const user = await User.query().findOne({ token: req.body.token });    

      if (!user) {
        req.formErrorFields = { token: "Invalid token" };
        req.flash = { type: "danger", message: "Errors occurred" };
        return next();
      }

      res.redirect(`/register/${user.token}`);
    }
  } catch (e) {
    next(e.message);
  }
};

export const registerSecondStep = async (req, res) => {
  const clearPincode = req.formErrorFields?.pincode
    ? ""
    : req.body?.pincode || ""; 

  const inputs = [
    {
      name: "token",
      label: "Token",
      type: "text",
      value: req.params.token ? req.params.token : "",
      err: req.formErrorFields?.token ? req.formErrorFields.token : "",
    },
    {
      name: "pincode",
      label: "Pincode",
      type: "text",
      value: clearPincode,
      err: req.formErrorFields?.pincode ? req.formErrorFields.pincode : "",
    },
  ];

  const imageInput = {
    name: "image-select",
    label: "Image",
    type: "radio",
    value: req.body?.image ? req.body.image : "",
    err: req.formErrorFields?.image ? req.formErrorFields.image : "",
  };

  const flash = req.flash || {};

  res.render("pages/register-second-step", {
    layout: "layouts/authentication",
    inputs,
    imageInput,
    flash,
    title: "Register",
  });
};

export const postRegisterSecondStep = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      req.flash = {
        type: "danger",
        message: "Er zijn fouten opgetreden",
      };

      return next();
    } else {
      const user = await User.query().findOne({ token: req.body.token });
      const regenToken = uuidv4().slice(0, 13).replace("-", "");

      if (!user) {
        req.formErrorFields = { token: "Invalid token" };
        req.flash = { type: "danger", message: "Errors occurred" };
        return next();
      }

      await User.query().findById(user.id).patch({
        pincode: req.body.pincode,
        token: regenToken,
        image_id: req.body.image_id,
      });

      res.redirect("/login");
    }
  } catch (e) {
    next(e.message);
  }
};


//Logout

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect('/login');
};