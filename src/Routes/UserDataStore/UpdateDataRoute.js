import express from "express";
import { VerifyTokenForDataStore } from "../../JWT/SignToken.js";
import { ProjectTable, ProjectDataStore } from "../../DataBase/DBSchema.js";
import {
  EncryptData,
  DecryptData,
} from "../../Middlewares/EncryptOrDecryptData.js";

const UpdateDataRoute = express.Router();

UpdateDataRoute.post("/api/UpdateData", async (req, res) => {
  try {
    let { Options } = req.body;

    let result = await VerifyTokenForDataStore(Options.Token);

    if (result != false) {
      let FindData = await ProjectDataStore.findOne({
        _uid: result.id,
      });

      let encryptdata = await EncryptData(JSON.stringify(Options.Data));

      if (encryptdata != false) {
        FindData.UserData.map((u) => {
          if (u._id == Options.Data_id) {
            u.Data = encryptdata;
          }
        });
        await FindData.save();

        res.status(200).send("Record Updated");
      } else {
        res.status(400).send("Please try again ... *");
      }
    } else {
      res.status(400).send("Please try again ... **");
    }
  } catch (error) {
    res.status(400).send("Please try again ... ***");
  }
});

export { UpdateDataRoute };
