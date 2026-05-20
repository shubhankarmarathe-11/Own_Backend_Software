import express from "express";
import { ValidateToken } from "./oauth.controller.ts";

import ValidateProjectID from "../../middleware/ValidateProjectID.ts";

const OauthRoute = express.Router();

OauthRoute.post("/oauth/validatetoken/:projectId", ValidateProjectID);

export { OauthRoute };
