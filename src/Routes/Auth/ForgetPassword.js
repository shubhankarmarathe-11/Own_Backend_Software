import express from "express";
import { ProjectDataTable } from "../../DataBase/DBSchema.js";

import bcrypt from "bcryptjs";

const ForgetPasswordRoute = express.Router();

ForgetPasswordRoute.post("/api/ForgetPassword", async (req, res) => {
  try {
    let { Options } = req.body;

    if (String(Options.UpdatedPassword).length >= 8) {
      let findAuthData = await ProjectDataTable.findOne({
        Projectid: Options.ProjectID,
      });

      let newdata = await findAuthData.AuthData.filter(
        (u) => u.ProjectPreferences.Email == Options.UserEmail
      );

      let hashedPassword = await bcrypt.hash(
        String(Options.UpdatedPassword),
        10
      );

      newdata[0].ProjectPreferences.Password = hashedPassword;

      let newarr = await findAuthData.AuthData.filter(
        (u) => u.id != newdata[0].id
      );

      newarr.push(newdata[0]);

      console.log(newarr[2]);

      findAuthData.AuthData = await newarr;

      console.log(findAuthData.AuthData[2]);

      await findAuthData.markModified("AuthData");

      await findAuthData.save();

      res.status(200).send("Password Changed Successfully");
    } else {
      res
        .status(400)
        .send("Password must contain minimum 8 characters or more ...");
    }
  } catch (error) {
    res.status(400).send("Please try again ....");
  }
});

export { ForgetPasswordRoute };
