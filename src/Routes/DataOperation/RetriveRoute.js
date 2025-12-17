import express from "express";
import { VerifyUserToken } from "../../Middlewares/Auth.js";
import { DecryptData } from "../../utils/Decrypt.js";
import { UserDataInformation } from "../../Schemas/UserDataInformation.js";

const RetriveDataRoute = express.Router();

RetriveDataRoute.post("/api/retrivedata", VerifyUserToken, async (req, res) => {
  try {
    let { id } = req;

    let FindUserData = await UserDataInformation.findOne({ UserID: id });
    let result = [];
    result.length = 0;
    for (let u of FindUserData.Data) {
      let newData = await DecryptData(String(u.Data));
      result.push({ Data: JSON.parse(newData), _id: u._id });
    }
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send("No Record Found");
    }
  } catch (error) {
    console.log(error);

    res.status(503).send("Please try again ****");
  }
});

export { RetriveDataRoute };
