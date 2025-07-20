import express from "express";
import { VerifyTokenForDataStore } from "../../JWT/SignToken.js";
import { ProjectTable, ProjectDataStore } from "../../DataBase/DBSchema.js";
import {
  EncryptData,
  DecryptData,
} from "../../Middlewares/EncryptOrDecryptData.js";

const DeleteDataRoute = express.Router();

DeleteDataRoute.post("/api/DeleteData", async (req, res) => {
  try {
    let { Options } = req.body;

    let result = await VerifyTokenForDataStore(Options.Token);

    if (result != false) {
      let FindData = await ProjectDataStore.findOneAndUpdate(
        { _uid: result.id },
        { $pull: { UserData: { _id: Options.Data_id } } }
      );
      res.status(200).send("Record Deleted ...");
    } else {
      res.status(400).send("Please try again ...");
    }
  } catch (error) {
    res.status(400).send("Please try again ...");
  }
});

export { DeleteDataRoute };
