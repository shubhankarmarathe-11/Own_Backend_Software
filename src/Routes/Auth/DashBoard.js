import express from "express";
import { CreateDataBase } from "../../Middlewares/CreateProjectDB.js";
import {
  ProjectTable,
  ProjectDataTable,
  ProjectDataStore,
} from "../../DataBase/DBSchema.js";

const ConnectProject = express.Router();

ConnectProject.post("/api/CreateProject", async (req, res) => {
  try {
    let { Options } = req.body;

    //In options we have which attributes need for the project auth like username,(email,password are by default), number , email serive for otp , address, full name, etc

    let TableCreation = await CreateDataBase({
      ProjectName: Options.ProjectName,
      ProjectPref: Options.ProjectPref,
      ExtraField: Options.ExtraField,
      ExtraServices: Options.ExtraServices,
    });
    console.log(TableCreation);

    if (TableCreation.status) {
      res.status(200).send(`${TableCreation.ProjectID}`);
    } else {
      res.status(409).send("Please Select another Project Name ....");
    }
  } catch (error) {
    res.status(400).send("Please try again ....");
  }
});

ConnectProject.post("/api/DeleteProject", async (req, res) => {
  try {
    let { Options } = req.body;

    let FindProj = await ProjectTable.findById(Options.ProjectID);
    let FindDataDBToDelete = await ProjectDataTable.findByIdAndDelete(
      FindProj.ProjectData[0]._id
    );

    let FindUserDataToDelete = await ProjectDataStore.findByIdAndDelete(
      FindProj.UserData[0]._id
    );

    let FindAndDelete = await ProjectTable.findByIdAndDelete(Options.ProjectID);

    res.status(200).send("Project Deleted ... ");
  } catch (error) {
    res.status(400).send("Please try Again ...");
  }
});

export { ConnectProject };
