import express from "express";
import ValidateProjectID from "../../middleware/ValidateProjectID.ts";
import {
  ValidateAuthData,
  ValidatePUserId,
  ValidateLoginData,
} from "./projectuser.auth.middleware.ts";

import {
  InsertProjectUserController,
  UpdateProjectUserController,
  DeleteProjectUserController,
  LoginProjectUserController,
} from "./projectuser.auth.controller.ts";

import { ValidateProjectRefreshToken } from "../Token/Token.middleware.ts";

const ProjectAuthRoute = express.Router();

ProjectAuthRoute.post(
  "/projectauth/register/:projectId",
  ValidateProjectID,
  ValidateAuthData,
  InsertProjectUserController,
);

ProjectAuthRoute.post(
  "/projectauth/login/:projectId",
  ValidateProjectID,
  ValidateLoginData,
  LoginProjectUserController,
);

ProjectAuthRoute.patch(
  "/projectauth/update/:projectId/",
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  ValidateAuthData,
  UpdateProjectUserController,
);

ProjectAuthRoute.delete(
  "/projectauth/delete/:projectId/",
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  DeleteProjectUserController,
);

export { ProjectAuthRoute };
