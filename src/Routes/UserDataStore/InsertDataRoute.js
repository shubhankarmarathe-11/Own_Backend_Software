import express from "express";
import { VerifyTokenForDataStore } from "../../JWT/SignToken.js";
import { ProjectTable, ProjectDataStore } from "../../DataBase/DBSchema.js";

import { EncryptData } from "../../Middlewares/EncryptOrDecryptData.js";

const InsertRoute = express.Router();

InsertRoute.post("/api/InsertData", async (req, res) => {
  try {
    let { Options } = req.body;

    let result = await VerifyTokenForDataStore(Options.Token);
    let FindProj = await ProjectTable.findById(Options.ProjectID);

    let encryptdata = await EncryptData(JSON.stringify(Options.Data));
    if (encryptdata != false && result != false) {
      let FindDataStore = await ProjectDataStore.findByIdAndUpdate(
        FindProj.UserData[0]._id,
        {
          $push: {
            UserData: { _uid: result.id, Data: encryptdata },
          },
        }
      );
      res.status(200).send("Data Inserted ... ");
    } else {
      res.status(400).send("Please try again ...");
    }
  } catch (error) {
    res.status(400).send("Please try again ...");
  }
});

export { InsertRoute };
