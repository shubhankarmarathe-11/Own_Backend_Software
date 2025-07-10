import express from "express";
import mongoose from "mongoose";
import { CreateDataBase } from "../../Middlewares/CreateProjectDB.js";

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

    if (TableCreation) {
      res.status(200).send("New Project Created .... ");
    } else {
      res.status(409).send("Please Select another Project Name ....");
    }
  } catch (error) {
    res.status(400).send("Please try again ....");
  }
});

export { ConnectProject };
