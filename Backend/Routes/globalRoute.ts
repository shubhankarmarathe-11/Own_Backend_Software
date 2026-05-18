import express from "express";
import ValidateAccessToken from "../middleware/ValidateAccessToken.ts";
import ValidateRefreshToken from "../middleware/ValidateRefreshToken.ts";

import { MasterAuthRoute } from "./MasterAuthRoute.ts";
import { ProjectRoute } from "../modules/project/project.route.ts";
import { ProjectAuthRoute } from "../modules/auth/auth.route.ts";
import { ProjectUserDataRoute } from "../modules/UserData/Projectdata.route.ts";

const globalRoute = express.Router();

globalRoute.use(MasterAuthRoute);
globalRoute.use(ProjectRoute);
globalRoute.use(ProjectAuthRoute);
globalRoute.use(ProjectUserDataRoute);

globalRoute.get(
  "/global",
  ValidateRefreshToken,
  ValidateAccessToken,
  (req, res) => {
    res.status(200).send("globalroute");
  },
);

export { globalRoute };
