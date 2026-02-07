import express from "express";
import {
  CreateNewUsercontroller,
  UpdateUsercontroller,
  DeleteUsercontroller,
} from "./project.controller.js";
import {
  InsertDatacontroller,
  DeleteDatacontroller,
  RetriveDatacontroller,
  UpdateDatacontroller,
} from "./project.controller.data.js";

const ProjectRoute = express.Router();

ProjectRoute.post("/project/auth/:project_id", CreateNewUsercontroller);
ProjectRoute.patch("/project/auth/:project_id/:user_id", UpdateUsercontroller);
ProjectRoute.delete("/project/auth/:project_id/:user_id", DeleteUsercontroller);

// Data CURD Operations

//insert
ProjectRoute.post("/project/:project_id/:user_id", InsertDatacontroller);

//update
ProjectRoute.post(
  "/project/:project_id/:user_id/:data_id",
  UpdateDatacontroller,
);

//retrive
ProjectRoute.post("/project/:project_id/:user_id", RetriveDatacontroller);

//delete
ProjectRoute.delete(
  "/project/:project_id/:user_id/:data_id",
  DeleteDatacontroller,
);

export { ProjectRoute };
