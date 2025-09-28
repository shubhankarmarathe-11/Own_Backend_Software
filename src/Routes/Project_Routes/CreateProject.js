import express from "express";
import { ProjectInformation } from "../../Schemas/ProjectInformation.js";

const CreateProject = express.Router();

async function CheckForProjectName(req, res, next) {
  try {
    let { ProjectName } = req.body;

    let FindProjectName = await ProjectInformation.findOne({
      ProjectName: ProjectName,
    });
    if (FindProjectName == null || FindProjectName == undefined) {
      next();
    } else {
      res.status(409).send("Please Select Another ProjectName");
    }
  } catch (error) {
    res.status(503).send("Please try Again");
  }
}

CreateProject.post(
  "/api/CreateProject",
  CheckForProjectName,
  async (req, res) => {
    try {
      let { ProjectName, AuthenticationMethods, EmailService } = req.body;
      let CreateProject = await ProjectInformation.create({
        ProjectName: ProjectName,
        AuthenticationMethods: AuthenticationMethods,
        EmailService: EmailService,
      });

      CreateProject.save();

      res
        .status(200)
        .send(
          `Project Created Successfully . Your ProjectId is -- ${CreateProject._id}`
        );
    } catch (error) {
      res.status(503).send("Please try Again");
    }
  }
);

//  Get ProjectID Details
CreateProject.post("/api/GetProjectID", async (req, res) => {
  try {
    let { ProjectName } = req.body;

    let FindProjectDetails = await ProjectInformation.findOne({
      ProjectName: ProjectName,
    });

    if (FindProjectDetails == null || FindProjectDetails == undefined) {
      res.status(404).send("No Project Found");
    } else {
      res.status(200).send(`Project ID is: ${FindProjectDetails._id}`);
    }
  } catch (error) {
    res.status(503).send("Please try Again");
  }
});

export { CreateProject };
