import express from "express";
import { ProjectDataTable } from "../../DataBase/DBSchema.js";

import bcrypt from "bcryptjs";
import { VerifyTokenForDataStore } from "../../JWT/SignToken.js";

const ForgetPasswordRoute = express.Router();

ForgetPasswordRoute.post("/api/ForgetPassword", async (req, res) => {
  try {
    let { Options } = req.body;

    if (String(Options.UpdatedPassword).length >= 8) {
      let result = await VerifyTokenForDataStore(Options.Token);
      if (result != false) {
        let findAuthData = await ProjectDataTable.findOne({
          Projectid: Options.ProjectID,
        });

        console.log(findAuthData);

        let newdata = await findAuthData.AuthData.filter(
          (u) => u.id == result.id
        );

        let hashedPassword = await bcrypt.hash(Options.UpdatedPassword, 10);

        newdata[0].ProjectPreferences.Password = hashedPassword;

        let newarr = await findAuthData.AuthData.filter(
          (u) => u.id != result.id
        );

        newarr.push(newdata[0]);

        findAuthData.AuthData = newarr;

        findAuthData.save();

        res.status(200).send("Password Changed Successfully");
      } else {
        res.status(400).send("Please try again ....");
      }
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
