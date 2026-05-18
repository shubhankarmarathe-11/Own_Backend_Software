import { ProjectUserModel } from "../model/ProjectuserSchema.ts";
import { ObjectId } from "mongodb";

import crypto from "crypto";

interface InsertDataType {
  PuserId: string;
  userData: string;
}

async function InsertDataService({ PuserId, userData }: InsertDataType) {
  try {
    let Fetchuser = await ProjectUserModel.findById(PuserId);

    if (Fetchuser == null) return 404;

    const encryptData = await crypto.publicEncrypt(
      Fetchuser.publicKey,
      Buffer.from(userData),
    );

    Fetchuser.Data = await encryptData.toString("base64");

    await Fetchuser.markModified("Data");

    await Fetchuser.save();

    return 200;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

async function RetriveDataService(PuserId: string) {
  try {
    let FetchuserData = await ProjectUserModel.findById(PuserId);

    if (FetchuserData == null) return 404;

    const decryptData = await crypto.privateDecrypt(
      FetchuserData.privateKey,
      Buffer.from(FetchuserData.Data, "base64"),
    );

    return decryptData.toString();
  } catch (error) {
    console.error(error);
    return 500;
  }
}

export { InsertDataService, RetriveDataService };
