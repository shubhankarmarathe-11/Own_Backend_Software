import express from "express";
import { ProjectTable, ProjectDataStore } from "../../DataBase/DBSchema.js";
import { VerifyTokenForDataStore } from "../../JWT/SignToken.js";
import { DecryptData } from "../../Middlewares/EncryptOrDecryptData.js";

const RetriveDataRoute = express.Router();

RetriveDataRoute.post("/api/RetriveData", async (req, res) => {
  try {
    let { Options } = req.body;

    let CheckToken = await VerifyTokenForDataStore(Options.Token);
    let result = [];
    if (CheckToken != false) {
      let UserData = await ProjectDataStore.findOne({ _uid: CheckToken.id });
      result.length = 0;
      for (let u of UserData.UserData) {
        let newData = await DecryptData(String(u.Data));
        result.push({ Data: JSON.parse(newData), _id: u._id });
      }
    }
    if (result.length != 0) {
      res.status(200).send(result);
    } else {
      res.status(400).send("Please try again ...*");
    }
  } catch (error) {
    res.status(400).send("Please try again ...");
  }

  //returns array
});

export { RetriveDataRoute };
