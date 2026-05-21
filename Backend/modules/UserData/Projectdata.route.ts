import express from "express";
import ValidateProjectID from "../../middleware/ValidateProjectID.ts";
import { ValidatePUserId } from "../auth/projectuser.auth.middleware.ts";
import { ValidateInputData } from "./Projectdata.middleware.ts";
import {
  InsertUserDataController,
  RetriveUserDataController,
} from "./Projectdata.controller.ts";
import { ValidateProjectRefreshToken } from "../Token/Token.middleware.ts";

const ProjectUserDataRoute = express.Router();

ProjectUserDataRoute.post(
  "/projectdata/add/:projectId/",
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  ValidateInputData,
  InsertUserDataController,
);

ProjectUserDataRoute.get(
  "/projectdata/retrive/:projectId/",
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  RetriveUserDataController,
);

export { ProjectUserDataRoute };
