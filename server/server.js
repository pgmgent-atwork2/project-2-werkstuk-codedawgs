import express from "express";
import expressLayouts from "express-ejs-layouts";
import { PORT, VIEWS_PATH } from "./consts.js";
import path from "path";
import cookieParser from "cookie-parser";

import * as pageController from "./controllers/pageController.js";
import * as authController from "./controllers/authController.js";
import * as userController from "./controllers/userController.js";
import * as taskController from "./controllers/taskController.js";
import * as notificationController from "./controllers/notificationController.js";

import * as API_TaskController from "./controllers/api/taskController.js";
import * as API_FilterController from "./controllers/api/filterController.js";
import * as API_DepartmentController from "./controllers/api/departmentController.js";
import * as API_MeasurementController from "./controllers/api/measurementController.js";

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

//API
app.get("/api/tasks", API_TaskController.tasks);
app.get("/api/tasklogs", API_TaskController.taskLogs);
app.get("/api/filters", API_FilterController.filters);
app.get("/api/departments", API_DepartmentController.departments);
app.get("/api/subdepartments", API_DepartmentController.subDepartments);
app.get("/api/measurement-definitions", API_MeasurementController.measurementDefinitions);

// Auth Routes
app.get("/login", authController.login);
app.post("/login", authLoginValidation, authController.postLogin, authController.login);
app.post("/logout", authController.logout);

app.get("/register", authController.registerFirstStep);
app.post("/register", authRegisterFirstStepValidation, authController.postRegisterFirstStep, authController.registerFirstStep);

app.get("/register/:token", authController.registerSecondStep);
app.post("/register/:token", authRegisterSecondStepValidation, authController.postRegisterSecondStep, authController.registerSecondStep);

// Homepage
app.get("/", jwtAuth, pageController.home);

// Admin pages
app.get("/admin", jwtAuth, isAdmin, pageController.admin);

// User management
app.get("/admin/users", jwtAuth, isAdmin, pageController.userPage);
app.post("/admin/users", jwtAuth, isAdmin, userController.postUser);
app.post("/admin/users/:id", jwtAuth, isAdmin, userController.deleteUser);

// Task management
app.get("/admin/tasks", jwtAuth, isAdmin, pageController.taskPageAdmin);

// Water analysis
app.get("/admin/analysis", jwtAuth, isAdmin, pageController.waterAnalysisPage);
app.post("/analysis/notification", jwtAuth, isAdmin, notificationController.postNotification);

// Task pages
app.get('/daily/:departmentString', jwtAuth, pageController.taskPage);
app.get('/weekly/:departmentString', jwtAuth, pageController.taskPage);
app.get('/monthly/:departmentString', jwtAuth, pageController.taskPage);
app.get('/general/analysis', jwtAuth, pageController.analysisPage);
app.get('/general/:taskName', jwtAuth, pageController.generalTaskPage);

// Task Routes
app.post('/tasks/:id/completed', jwtAuth, taskController.taskComplete);
app.post('/tasks/analysis', jwtAuth, taskController.postAnalysis);
app.post('/admin/tasks', jwtAuth, isAdmin, taskController.addTask);
app.get("/admin/tasks/object-options", jwtAuth, isAdmin, taskController.getObjectOptions);

// Measurement Routes
app.post('/admin/analysis/:id', jwtAuth, isAdmin, taskController.editMeasurement);

// Task Edit
app.post('/admin/tasks/:id', jwtAuth, isAdmin, taskController.editTask);

// Notification Routes
app.get('/notifications', jwtAuth, notificationController.getNotifications);
app.get('/notifications/all', jwtAuth, notificationController.getAllNotifications);
app.post('/notifications/:id', jwtAuth, notificationController.resolveNotification);

// Error handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Something went wrong.");
});

// 404
app.use((req, res) => {
  res.render("errors/404", {title: 404,})
});

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}/.`);
});