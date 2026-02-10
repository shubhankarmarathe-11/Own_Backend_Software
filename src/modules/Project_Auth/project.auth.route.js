import express from "express";
import {
  CreateNewUsercontroller,
  UpdateUsercontroller,
  DeleteUsercontroller,
  LoginUserController,
} from "./project.auth.controller.js";

const ProjectAuthRoute = express.Router();

ProjectAuthRoute.post("/project/auth/login", LoginUserController);
ProjectAuthRoute.post("/project/auth/register", CreateNewUsercontroller);
ProjectAuthRoute.patch("/project/auth/update", UpdateUsercontroller);
ProjectAuthRoute.delete("/project/auth/delete", DeleteUsercontroller);

export { ProjectAuthRoute };
