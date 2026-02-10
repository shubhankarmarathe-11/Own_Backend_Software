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

const DashboardRoute = express.Router();

// Get Routes
DashboardRoute.get("/dash/profile", GetProfileController);
DashboardRoute.get("/dash/projects", GetAllProjects);
DashboardRoute.get("/dash/project/:_id", GetProjectDetailController);

// Post Routes
DashboardRoute.post("/dash/createproject", CreateProjectController);
DashboardRoute.delete("/dash/deleteproject", DeleteProjectController);

DashboardRoute.post("/dash/editservices", async (req, res) => {});

DashboardRoute.post("/dash/editprofile", async (req, res) => {});

export { DashboardRoute };
