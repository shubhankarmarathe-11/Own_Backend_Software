import express from "express";
import {
  InsertDatacontroller,
  DeleteDatacontroller,
  RetriveDatacontroller,
  UpdateDatacontroller,
} from "./project.controller.data.js";

const ProjectRoute = express.Router();

// Data CURD Operations
//insert
ProjectRoute.post("/project/insert", InsertDatacontroller);

//update
ProjectRoute.post("/project/update", UpdateDatacontroller);

//retrive
ProjectRoute.post("/project/retrive", RetriveDatacontroller);

//delete
ProjectRoute.delete("/project/delete", DeleteDatacontroller);

export { ProjectRoute };
