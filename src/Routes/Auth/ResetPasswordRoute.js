import express from "express";
import { UserAuthInformation } from "../../Schemas/UserAuthInformation.js";
import { VerifyUserToken } from "../../Middlewares/Auth.js";
import bcrypt from "bcryptjs";

const ResetPasswordRoute = express.Router();

ResetPasswordRoute.post(
  "/api/ResetPassword",
  VerifyUserToken,
  async (req, res) => {
    try {
      let { ProjectID, NewPassword } = req.body;
      let { id } = req;

      NewPassword = await bcrypt.hash(String(NewPassword), 10);

      let UpdatePassword = await UserAuthInformation.findOneAndUpdate(
        {
          ProjectID: ProjectID,
          "AuthData._id": id,
        },
        { "AuthData.Password": NewPassword }
      );
      if (UpdatePassword != null || UpdatePassword != undefined) {
        res.status(200).send("Password Updated");
      } else {
        res.status(401).send("User not Found");
      }
    } catch (error) {
      res.status(503).send("Please try again");
    }
  }
);

ResetPasswordRoute.post("/ForgetPassword", async (req, res) => {
  try {
    let { ProjectID, NewPassword, EmailID } = req.body;

    NewPassword = await bcrypt.hash(String(NewPassword), 10);

    let UpdatePassword = await UserAuthInformation.findOneAndUpdate(
      {
        ProjectID: ProjectID,
        "AuthData.Email": EmailID,
      },
      { "AuthData.Password": NewPassword }
    );

    if (UpdatePassword != null || UpdatePassword != undefined) {
      res.status(200).send("Password Updated");
    } else {
      res.status(401).send("User not Found");
    }
  } catch (error) {
    res.status(503).send("Please try again");
  }
});

export { ResetPasswordRoute };
