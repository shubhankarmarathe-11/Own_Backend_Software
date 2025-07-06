import express from "express";
import { ProjectDataTable, ProjectTable } from "../DataBase/DBSchema.js";
import { LoginChecks } from "../Middlewares/LoginMethods.js";

const Login = express.Router();

Login.post("/api/Login", async (req, res) => {
  let { ProjectID, Options } = req.body;

  try {
    let FindPRoject = await ProjectTable.findById(ProjectID);
    let findAuthData = await ProjectDataTable.findById(
      FindPRoject.ProjectData[0]
    );

    let LoginCHeckValue = await LoginChecks(FindPRoject, findAuthData, Options);
    console.log(LoginCHeckValue);

    if (LoginCHeckValue == 200) {
      res.status(200).send("Correct Logins");
    } else {
      res.status(409).send("Invalid Credentials ... ");
    }
  } catch (error) {
    res.status(400).send("Please Try Again ... ");
  }
});

export { Login };
