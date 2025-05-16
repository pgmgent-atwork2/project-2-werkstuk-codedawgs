import express from "express";
import expressLayouts from "express-ejs-layouts";
import { PORT, VIEWS_PATH } from "./consts.js";

// APP config
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}/.`);
});