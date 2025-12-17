import express from "express";
import bcrypt from "bcryptjs";
import { UserAuthInformation } from "../../Schemas/UserAuthInformation.js";
import { SignNewToken } from "../../utils/jwt.js";

const LoginRoute = express.Router();

async function handleInputs(req, res, next) {
  try {
    let { EmailOrUsername } = req.body;

    if (String(EmailOrUsername).includes("@gmail.com")) {
      req.Email = EmailOrUsername;
      next();
    } else {
      req.Username = EmailOrUsername;
      next();
    }
  } catch (error) {
    res.status(503).send("Please try again");
  }
}

async function VerifyPassword(req, res, next) {
  try {
    let { Password, EmailOrUsername, ProjectID } = req.body;
    Password = String(Password);
    EmailOrUsername = String(EmailOrUsername);

    let FindUser = await UserAuthInformation.findOne({
      ProjectID: ProjectID,
      "AuthData.Email": EmailOrUsername,
    });

    if (FindUser == null || FindUser == undefined) {
      res.status(401).send("Username not Found ");
    } else {
      let CompareHash = await bcrypt.compare(
        Password,
        FindUser.AuthData.Password
      );

      if (CompareHash == true) {
        req.UserFound = FindUser;
        next();
      } else {
        res.status(401).send("Incorrect Password");
      }
    }
  } catch (error) {
    res.status(503).send("Please try again");
  }
}

LoginRoute.post(
  "/api/login",
  handleInputs,
  VerifyPassword,
  async (req, res) => {
    try {
      let { UserFound } = req;

      let Token = await SignNewToken(String(UserFound.AuthData._id));

      if (Token != false) {
        res.status(200).send(`Login Successful . your Token is -- ${Token}`);
      } else {
        res.status(503).send("Please try again");
      }
    } catch (error) {
      res.status(503).send("Please try again");
    }
  }
);

export { LoginRoute };
