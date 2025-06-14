import { validationResult } from "express-validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const login = async (req, res) => {
  const users = await User.query().select("*");

  const input = {
    name: "pincode",
    label: "Pincode",
    type: "password",
    value: req.body?.pincode ? req.body.pincode : "",
    err: req.formErrorFields?.pincode ? req.formErrorFields["pincode"] : "",
  };
  const flash = req.flash || {};

  res.render("pages/login", {
    title: "Login",
    layout: "layouts/authentication",
    users,
    input,
    flash,
  });
};

export const postLogin = async (req, res, next) => {
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
    }

    const user = await User.query().findOne({
      id: req.body.id,
    });

    if (!user) {
      req.formErrorFields = { id: "User does not exist" };
      req.flash = { type: "danger", message: "Errors occurred" };
      return next();
    }

    if (req.body.pincode !== user.pincode) {
      req.formErrorFields = { pincode: "Invalid pincode" };
      req.flash = { type: "danger", message: "Errors occurred" };
      return next();
    }

    const userToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.TOKEN_SALT,
      {
        expiresIn: "10h",
      }
    );

    res.cookie("userToken", userToken, { httpOnly: true });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      redirectUrl: "/",
    });
  } catch (e) {
    next(e.message);
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
  };
  const flash = req.flash || {};

  res.render("pages/register-first-step", {
    title: "Enter Token | Register",
    layout: "layouts/authentication",
    input,
    flash,
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
    title: "Register",
    layout: "layouts/authentication",
    inputs,
    imageInput,
    flash,
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
  res.clearCookie("userToken");
  res.redirect("/login");
};
