import { ProjectUserModel } from "../model/ProjectuserSchema.ts";

async function FetchAllFilekeys(PuserId: string) {
  try {
    const InsertKey = await ProjectUserModel.findOne({ _id: PuserId });

    if (InsertKey == null) return 404;

    return InsertKey.fileKeys;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

async function UploadFileService(PuserId: string, key: string) {
  try {
    const InsertKey = await ProjectUserModel.updateOne(
      { _id: PuserId },
      { $push: { fileKeys: key } },
    );

    if (InsertKey.acknowledged == false) return 500;

    if (InsertKey.modifiedCount == 1 && InsertKey.matchedCount == 1) return 200;

    return 404;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

async function DeleteFileService(PuserId: string, key: string) {
  try {
    const InsertKey = await ProjectUserModel.updateOne(
      { _id: PuserId },
      { $pull: { fileKeys: key } },
    );

    if (InsertKey.acknowledged == false) return 500;

    if (InsertKey.modifiedCount == 1 && InsertKey.matchedCount == 1) return 200;

    return 404;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

export { UploadFileService, DeleteFileService, FetchAllFilekeys };
