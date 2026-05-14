import express from "express";
import {
  GetProfileController,
  GetAllProjects,
  GetProjectDetailController,
} from "./controller/get.controller.js";
import {
  CreateProjectController,
  DeleteProjectController,
} from "./controller/post.controller.js";
import { VerifyUserToken } from "../../Middlewares/Auth.js";

const DashboardRoute = express.Router();

// Get Routes
DashboardRoute.get("/dash/profile", VerifyUserToken, GetProfileController);
DashboardRoute.get("/dash/projects", VerifyUserToken, GetAllProjects);
DashboardRoute.get(
  "/dash/project/:_id",
  VerifyUserToken,
  GetProjectDetailController,
);

// Post Routes
DashboardRoute.post(
  "/dash/createproject",
  VerifyUserToken,
  CreateProjectController,
);
DashboardRoute.delete(
  "/dash/deleteproject",
  VerifyUserToken,
  DeleteProjectController,
);

DashboardRoute.post("/dash/editservices", async (req, res) => {});

DashboardRoute.post("/dash/editprofile", async (req, res) => {});

export { DashboardRoute };
