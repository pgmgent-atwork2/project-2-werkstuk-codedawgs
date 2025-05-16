import express from "express";
import expressLayouts from "express-ejs-layouts";
import { PORT, VIEWS_PATH } from "./consts.js";
import path from "path";

import * as authController from "./controllers/authController.js";

// APP config
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS config
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.set("views", path.resolve("server", "views"));

// Auth Routes
app.get("/login", authController.login);

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}/.`);
});