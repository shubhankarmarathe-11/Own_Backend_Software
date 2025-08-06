import express from "express";
import {
  ProjectDataStore,
  ProjectDataTable,
  ProjectTable,
} from "../../DataBase/DBSchema.js";
import { VerifyTokenForDataStore } from "../../JWT/SignToken.js";

const DeleteAccountRoute = express.Router();

DeleteAccountRoute.post("/api/DeleteAccount", async (req, res) => {
  try {
    let { Options } = req.body;
    let result = await VerifyTokenForDataStore(Options.Token);

    if (result != false) {
      let FindAuthData = await ProjectDataTable.findOne({
        Projectid: Options.ProjectID,
      });

      let filterarr = await FindAuthData.AuthData.filter(
        (u) => u.id != result.id
      );

      FindAuthData.AuthData = filterarr;
      FindAuthData.save();

      let FindStoredData = await ProjectDataStore.findOneAndDelete({
        _uid: result.id,
      });

      let UpdateProjectTable = await ProjectTable.findByIdAndUpdate(
        Options.ProjectID,
        { $pull: { UserData: FindStoredData._id } }
      );

      FindStoredData.save();

      UpdateProjectTable.save();

      res.status(200).send("Account Deleted ...");
    } else {
      res.status(400).send("Please Try Again .... * ");
    }
  } catch (error) {
    res.status(400).send("Please Try Again ....");
  }
});

export { DeleteAccountRoute };
