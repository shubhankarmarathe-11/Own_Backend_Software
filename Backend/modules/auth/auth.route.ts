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
  ValidateProjectID,
  ValidatePUserId,
  ValidateAuthData,
  UpdateProjectUserController,
);

ProjectAuthRoute.delete(
  "/projectauth/delete/:projectId/",
  ValidateProjectID,
  ValidatePUserId,
  DeleteProjectUserController,
);

export { ProjectAuthRoute };
