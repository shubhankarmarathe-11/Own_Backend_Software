import express from "express";
import { VerifyUserToken } from "../../Middlewares/Auth.js";
import { UserDataInformation } from "../../Schemas/UserDataInformation.js";

const DeleteDataRoute = express.Router();

DeleteDataRoute.post("/api/DeleteData", VerifyUserToken, async (req, res) => {
  try {
    let { id } = req;
    let { Data_id } = req.body;

    let FindData = await UserDataInformation.findOne({ UserID: id });

    console.log(FindData);

    if ((FindData != undefined || FindData != null) && Data_id != "") {
      let UpdatedArray = [];

      UpdatedArray.length = 0;
      console.log("work");

      UpdatedArray = FindData.Data.filter((u) => u._id != Data_id);

      FindData.Data = UpdatedArray;

      await FindData.markModified("Data");
      await FindData.save();

      res.status(200).send("Data Removed .. ");
    } else {
      res.status(400).send("Please try again ");
    }
  } catch (error) {
    res.status(503).send("Please try again ..");
  }
});

export { DeleteDataRoute };
