import express from "express";
import ValidateProjectID from "../../middleware/ValidateProjectID.ts";
import { ValidatePUserId } from "../auth/projectuser.auth.middleware.ts";
import { ValidateInputData } from "./Projectdata.middleware.ts";
import {
  InsertUserDataController,
  RetriveUserDataController,
} from "./Projectdata.controller.ts";

const ProjectUserDataRoute = express.Router();

ProjectUserDataRoute.post(
  "/projectdata/add/:projectId/:PuserId",
  ValidateProjectID,
  ValidatePUserId,
  ValidateInputData,
  InsertUserDataController,
);

ProjectUserDataRoute.get(
  "/projectdata/retrive/:projectId/:PuserId",
  ValidateProjectID,
  ValidatePUserId,
  RetriveUserDataController,
);

export { ProjectUserDataRoute };
