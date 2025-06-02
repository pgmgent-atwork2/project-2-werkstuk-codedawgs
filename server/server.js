import express from "express";
import expressLayouts from "express-ejs-layouts";
import { PORT, VIEWS_PATH } from "./consts.js";
import path from "path";
import cookieParser from "cookie-parser";

import * as pageController from "./controllers/pageController.js";
import * as authController from "./controllers/authController.js";
import * as userController from "./controllers/userController.js";

import authLoginValidation from "./middleware/validation/authLoginValidation.js";
import authRegisterFirstStepValidation from './middleware/validation/authRegisterFirstStepValidation.js';
import authRegisterSecondStepValidation from "./middleware/validation/authRegisterSecondStepValidation.js";

import jwtAuth from "./middleware/jwtAuth.js";
import isAdmin from './middleware/isAdmin.js';

// APP config
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// EJS config
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.set("views", path.resolve("server", "views"));

// Auth Routes
app.get("/login", authController.login);
app.post("/login", authLoginValidation, authController.postLogin, authController.login);
app.post("/logout", authController.logout);

app.get("/register", authController.registerFirstStep);
app.post("/register", authRegisterFirstStepValidation, authController.postRegisterFirstStep, authController.registerFirstStep);

app.get("/register/:token", authController.registerSecondStep);
app.post("/register/:token", AuthRegisterSecondStepValidation, authController.postRegisterSecondStep, authController.registerSecondStep);


// Homepage
app.get("/", jwtAuth, pageController.home);

app.get("/admin", jwtAuth, isAdmin, pageController.admin);

// Gebruikersbeheer
app.get("/admin/users", jwtAuth, isAdmin, pageController.userPage);
app.post("/admin/users", jwtAuth, isAdmin, userController.postUser);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Something went wrong.");
});

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}/.`);
});