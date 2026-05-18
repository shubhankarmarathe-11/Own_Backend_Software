import express from "express";
import ValidateRefreshToken from "../../middleware/ValidateRefreshToken.ts";
import ValidateAccessToken from "../../middleware/ValidateAccessToken.ts";

import {
  CreateprojectController,
  DeleteprojectController,
  FetchprojectsController,
  FetchprojectDetailController,
} from "./project.controller.ts";

import { ValidateProjectId } from "./project.middleware.ts";

const ProjectRoute = express.Router();

ProjectRoute.get(
  "/project/getprojects",
  ValidateRefreshToken,
  ValidateAccessToken,
  FetchprojectsController,
);

ProjectRoute.get(
  "/project/getprojectdetail/:projectId",
  ValidateRefreshToken,
  ValidateAccessToken,
  ValidateProjectId,
  FetchprojectDetailController,
);

ProjectRoute.post(
  "/project/createproject",
  ValidateRefreshToken,
  ValidateAccessToken,
  CreateprojectController,
);

ProjectRoute.delete(
  "/project/deleteproject/:projectId",
  ValidateRefreshToken,
  ValidateAccessToken,
  ValidateProjectId,
  DeleteprojectController,
);

export { ProjectRoute };
