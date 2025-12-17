import express from "express";
import { ProjectInformation } from "../../Schemas/ProjectInformation.js";
import { UserAuthInformation } from "../../Schemas/UserAuthInformation.js";
import { UserDataInformation } from "../../Schemas/UserDataInformation.js";

const DeleteProjectRoute = express.Router();

DeleteProjectRoute.post("/api/deleteproject", async (req, res) => {
  try {
    let { ProjectID } = req.body;

    let FindAuthInfo = await UserAuthInformation.find({ ProjectID: ProjectID });

    let UserIDArray = await FindAuthInfo.map((u) => u._id);

    if (UserIDArray.length != 0) {
      for (let index = 0; index < UserIDArray.length; index++) {
        await UserAuthInformation.findByIdAndDelete(UserIDArray[index]);
        await UserDataInformation.findOneAndDelete({
          UserID: UserIDArray[index],
        });
      }
      UserIDArray.length = 0;
      await ProjectInformation.findByIdAndDelete(ProjectID);

      res.status(200).send("Project Deleted");
    } else {
      res.status(404).send("Project Not Found");
    }
  } catch (error) {
    res.status(503).send("Please try Again");
  }
});

export { DeleteProjectRoute };
