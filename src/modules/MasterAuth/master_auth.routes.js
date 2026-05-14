import express from "express";
//Login
import { LoginMiddleware, SignupMiddleware } from "./master_auth.middleware.js";
import {
  ForgotController,
  LoginController,
  SignupController,
  ChangeUserDetail,
  LogoutController,
  IsLoggedIn,
} from "./master_auth.controller.js";

const MasterRoute = express.Router();

MasterRoute.get("/master/istokenvalid", IsLoggedIn);

// Login Route

MasterRoute.post("/master/login", LoginMiddleware, LoginController);

//Signup Route

MasterRoute.post("/master/register", SignupMiddleware, SignupController);

// logout Route

MasterRoute.post("/master/logout", LogoutController);

// Forgot Password Route

MasterRoute.post("/master/forgetpassword", ForgotController);

// Change UserDetail

MasterRoute.post("/master/changedetails", ChangeUserDetail);

export { MasterRoute };
