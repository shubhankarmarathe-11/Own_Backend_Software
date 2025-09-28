import express from "express";
import { VerifyUserToken } from "../../Middlewares/Auth.js";
import { EncryptData } from "../../utils/encrypt.js";
import { UserDataInformation } from "../../Schemas/UserDataInformation.js";

const InsertDataRoute = express.Router();

InsertDataRoute.post("/api/InsertData", VerifyUserToken, async (req, res) => {
  try {
    let { id } = req;
    let { UserData } = req.body;

    UserData = await JSON.stringify(UserData);
    let encrypt = await EncryptData(UserData);
    console.log(id);

    console.log(encrypt);

    if ((id != undefined || id != null) && encrypt != false) {
      let Finddata = await UserDataInformation.findOneAndUpdate(
        { UserID: id },
        { $push: { Data: { Data: encrypt } } }
      );
      console.log(Finddata);

      if (Finddata != undefined || Finddata != null) {
        res.status(200).send("Data Inserted .. ");
      } else {
        res.status(503).send("Please try again **");
      }
    } else {
      res.status(503).send("Please try again ***");
    }
  } catch (error) {
    res.status(503).send("Please try again ****");
  }
});

export { InsertDataRoute };
