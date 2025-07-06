import express from "express";
import { ProjectTable, ProjectDataTable } from "../DataBase/DBSchema.js";
import { SignupPreCheck } from "../Middlewares/SignupMethods.js";
import {
  EmailCheck,
  MobileNo,
  PasswordCheck,
  CheckPref,
} from "../Middlewares/SignupMiddlewares.js";
import bcrypt from "bcryptjs";

const SignupRoute = express.Router();

SignupRoute.post(
  "/api/Signup",
  CheckPref,
  EmailCheck,
  PasswordCheck,
  MobileNo,
  async (req, res) => {
    let { ProjectID, Options } = req.body;

    try {
      let findProject = await ProjectTable.findById(ProjectID); // Project Details mean Preferences are fetched

      let findAuthData = await ProjectDataTable.findById(
        findProject.ProjectData[0]
      ); // related Data set is fetched to store the data

      // By default Options

      let PreCheck = await SignupPreCheck(Options, findAuthData);

      if (PreCheck == 200) {
        Options.ProjectPreferences.Password = await bcrypt.hash(
          Options.ProjectPreferences.Password,
          10
        );
        await ProjectDataTable.findByIdAndUpdate(findProject.ProjectData[0], {
          $push: { AuthData: Options },
        });

        res.status(200).send("Account Created ....");
      } else if (PreCheck == 409) {
        res.status(409).send("Please Choose Another Email or UserName ... ");
      } else {
        res.status(406).send("Please Select Another options ... ");
      }
    } catch (error) {
      res.status(400).send("Please try Again ....");
    }
  }
);

export { SignupRoute };
