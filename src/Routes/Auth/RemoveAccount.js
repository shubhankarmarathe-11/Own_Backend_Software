import express from "express";
import { UserAuthInformation } from "../../Schemas/UserAuthInformation.js";
import { UserDataInformation } from "../../Schemas/UserDataInformation.js";
import { ProjectInformation } from "../../Schemas/ProjectInformation.js";
import { VerifyUserToken } from "../../Middlewares/Auth.js";

const RemoveAccountRoute = express.Router();

RemoveAccountRoute.post(
  "/api/removeaccount",
  VerifyUserToken,
  async (req, res) => {
    try {
      let { ProjectID } = req.body;
      let { id } = req;

      let FindUser = await UserAuthInformation.findOne({
        ProjectID: ProjectID,
        "AuthData._id": id,
      });

      if (FindUser != undefined || FindUser != null) {
        await UserDataInformation.findOneAndDelete({
          UserID: FindUser.AuthData._id,
        });

        await ProjectInformation.findByIdAndUpdate(ProjectID, {
          $pull: { UserauthInfo: FindUser.AuthData._id },
        });

        await UserAuthInformation.findOneAndDelete({
          ProjectID: ProjectID,
          "AuthData._id": id,
        });

        res.status(200).send("Account Removed ...");
      }
    } catch (error) {
      res.status(503).send("Please try again");
    }
  }
);

export { RemoveAccountRoute };
