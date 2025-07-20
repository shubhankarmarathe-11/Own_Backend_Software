import express from "express";
import {
  ProjectTable,
  ProjectDataTable,
  ProjectDataStore,
} from "../../DataBase/DBSchema.js";
import { SignupPreCheck } from "../../Middlewares/SignupMethods.js";
import {
  EmailCheck,
  MobileNo,
  PasswordCheck,
  CheckPref,
} from "../../Middlewares/SignupMiddlewares.js";
import bcrypt from "bcryptjs";
import { SignNewToken } from "../../JWT/SignToken.js";

const SignupRoute = express.Router();

const generateCustomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@#%&";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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

      let GeneratedID = await generateCustomId();
      console.log(GeneratedID);

      let PreCheck = await SignupPreCheck(Options, findAuthData, GeneratedID);

      if (PreCheck == 200) {
        Options.ProjectPreferences.Password = await bcrypt.hash(
          Options.ProjectPreferences.Password,
          10
        );
        await ProjectDataTable.findByIdAndUpdate(findProject.ProjectData[0], {
          $push: {
            AuthData: {
              id: String(GeneratedID),
              ProjectPreferences: Options.ProjectPreferences,
              ExtraFields: Options.ExtraFields,
            },
          },
        });

        await ProjectDataStore.findByIdAndUpdate(findProject.UserData[0], {
          _uid: String(GeneratedID),
        });

        let Token = await SignNewToken(GeneratedID);
        res.status(200).send(`${Token}`);
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
