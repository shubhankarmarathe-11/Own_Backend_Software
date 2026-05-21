import express from "express";
import { ValidateProjectRefreshToken } from "./Token.middleware.ts";
import { GenerateProjectAccessToken } from "./Token.controller.ts";

const ProjectTokenRoute = express.Router();

ProjectTokenRoute.post(
  "/projecttoken/generate/accesstoken",
  ValidateProjectRefreshToken,
  GenerateProjectAccessToken,
);

export { ProjectTokenRoute };
