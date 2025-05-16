import User from "../models/User.js";

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