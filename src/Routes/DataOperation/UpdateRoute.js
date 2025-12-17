import express from "express";
import { VerifyUserToken } from "../../Middlewares/Auth.js";
import { UserDataInformation } from "../../Schemas/UserDataInformation.js";
import { EncryptData } from "../../utils/encrypt.js";

const UpdateDataRoute = express.Router();

UpdateDataRoute.post("/api/updatedata", VerifyUserToken, async (req, res) => {
  try {
    let { id } = req;
    let { NewData, Data_id } = req.body;

    NewData = await JSON.stringify(NewData);
    let encryptdata = await EncryptData(NewData);

    let FindData = await UserDataInformation.findOne({ UserID: id });

    if ((FindData != undefined || FindData != null) && encryptdata != false) {
      let ModifyArray = [];
      let UpdatedArray = [];

      ModifyArray.length = 0;
      UpdatedArray.length = 0;

      ModifyArray = FindData.Data.filter((u) => u._id == Data_id);
      ModifyArray[0].Data = encryptdata;

      UpdatedArray = FindData.Data.filter((u) => u._id != Data_id);
      UpdatedArray.push(ModifyArray[0]);

      FindData.Data = UpdatedArray;

      await FindData.markModified("Data");
      await FindData.save();

      res.status(200).send("Data Updated .. ");
    } else {
      res.status(400).send("Please try again ");
    }
  } catch (error) {
    res.status(503).send("Please try again ");
  }
});

export { UpdateDataRoute };
