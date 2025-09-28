import express from "express";
import { UserAuthInformation } from "../../Schemas/UserAuthInformation.js";
import { UserDataInformation } from "../../Schemas/UserDataInformation.js";
import { ProjectInformation } from "../../Schemas/ProjectInformation.js";
import { SignNewToken } from "../../utils/jwt.js";
import { ValidateInput, CheckEmail } from "../../Middlewares/ValidateInput.js";
import bcrypt from "bcryptjs";

const SignupRoute = express.Router();

SignupRoute.post("/api/Signup", ValidateInput, CheckEmail, async (req, res) => {
  try {
    let { ProjectID, Email, Password, Username, MobileNumber } = req.body;

    Password = await bcrypt.hash(String(Password), 10);

    let Createuser = await UserAuthInformation.create({
      ProjectID: ProjectID,
      AuthData: {
        Email: Email,
        Password: Password,
        Username: Username,
        MobileNumber: MobileNumber,
      },
    });

    await Createuser.save();

    let Token = await SignNewToken(String(Createuser.AuthData._id));

    if (Token != false) {
      let CreateUserData = await UserDataInformation.create({
        UserID: Createuser.AuthData._id,
      });
      await CreateUserData.save();

      Createuser.AuthData.UserDataInfo = await CreateUserData._id;
      await Createuser.save();

      await ProjectInformation.findByIdAndUpdate(ProjectID, {
        $push: { UserauthInfo: Createuser.AuthData._id },
      });
      res.status(200).send(`Account Created . User Token -- ${Token} `);
    } else {
      await UserAuthInformation.findByIdAndDelete(Createuser._id);
      res.status(503).send("Please try again");
    }
  } catch (error) {
    res.status(503).send("Please try again");
  }
});

export { SignupRoute };
