import express from "express";
import expressLayouts from "express-ejs-layouts";
import { PORT, VIEWS_PATH } from "./consts.js";
import path from "path";
import jwtAuth from "./middleware/jwtAuth.js";
import isAdmin from './middleware/isAdmin.js';
import cookieParser from "cookie-parser";

import * as pageController from "./controllers/pageController.js";
import * as authController from "./controllers/authController.js";
import authLoginValidation from "./middleware/validation/authLoginValidation.js";


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

// Homepage
app.get("/", jwtAuth, pageController.home);

// Gebruikersbeheer
app.get("/admin/gebruikers", jwtAuth, isAdmin, pageController.userPage);
app.post("/admin/gebruikers", jwtAuth, isAdmin, authController.postUser);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Something went wrong.");
});

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}/.`);
});