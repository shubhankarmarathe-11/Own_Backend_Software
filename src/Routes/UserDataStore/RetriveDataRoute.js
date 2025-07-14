import express from "express";
import { ProjectTable, ProjectDataStore } from "../../DataBase/DBSchema.js";
import { VerifyTokenForDataStore } from "../../JWT/SignToken.js";
import { DecryptData } from "../../Middlewares/EncryptOrDecryptData.js";

const RetriveDataRoute = express.Router();

RetriveDataRoute.post("/api/RetriveData", async (req, res) => {
  try {
    let { Options } = req.body;

    let FindProj = await ProjectTable.findById(Options.ProjectID);

    let FindData = await ProjectDataStore.findById(FindProj.UserData[0]._id);

    let FindUser = await VerifyTokenForDataStore(Options.Token);

    let UserData = await FindData.UserData.filter((u) => u._uid == FindUser.id);

    let result = [];

    result.length = 0;

    for (let u of UserData) {
      let newData = await DecryptData(u.Data);

      if (newData != false) {
        result.push({ _uid: u._uid, Data: JSON.parse(newData), _id: u._id });
      }
    }

    if (result.length != 0) {
      res.status(200).send(result);
    } else {
      res.status(400).send("Please try again ...");
    }
  } catch (error) {
    res.status(400).send("Please try again ...");
  }

  //returns array
});

export { RetriveDataRoute };
