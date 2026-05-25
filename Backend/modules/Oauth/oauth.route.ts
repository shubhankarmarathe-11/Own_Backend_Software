import express from "express";
import { ValidateToken } from "./oauth.controller.ts";

import ValidateProjectID from "../../middleware/ValidateProjectID.ts";
import {
  ValidateProjectRefreshToken,
  ValidateProjectAccessToken,
} from "../Token/Token.middleware.ts";

const OauthRoute = express.Router();

OauthRoute.post(
  "/oauth/validatetoken/:projectId",
  ValidateProjectID,
  ValidateToken,
);

export { OauthRoute };
