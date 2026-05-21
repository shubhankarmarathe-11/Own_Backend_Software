import type { Request, Response } from "express";
import {
  UploadFileService,
  DeleteFileService,
  FetchAllFilekeys,
} from "../../Service/ProjectUserupload.Services.ts";
import {
  uploadToS3,
  getSignedFileUrl,
  deleteFromS3,
} from "../../Service/UploadService.ts";

async function UploadFileController(req: Request, res: Response) {
  try {
    const Key = await uploadToS3(req.file);

    if (Key == 500)
      return res.status(500).send("server error please try again");

    const uploadService = await UploadFileService(
      String(req.PuserId),
      Key,
    );

    if (uploadService == 500)
      return res.status(500).send("server error please try again");

    if (uploadService == 404) return res.status(404).send("user not found");

    return res.status(201).send("file uploaded");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function FetchAllFileKeysController(req: Request, res: Response) {
  try {
    const FetchKeys = await FetchAllFilekeys(String(req.PuserId));

    if (FetchKeys == 500)
      return res.status(500).send("server error please try again");

    if (FetchKeys == 404) return res.status(404).send("user not found");

    return res.status(200).send({ keys: FetchKeys });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function GetFileUrlController(req: Request, res: Response) {
  try {
    const Url = await getSignedFileUrl(req.params.key);
    if (Url == 500)
      return res.status(500).send("server error please try again");

    return res.status(200).send({ url: Url });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function DeleteFileController(req: Request, res: Response) {
  try {
    const DeleteFile = await deleteFromS3(req.params.key);

    if (DeleteFile == 500)
      return res.status(500).send("server error please try again");

    const pullfromdb = await DeleteFileService(
      String(req.PuserId),
      String(req.params.key),
    );

    if (pullfromdb == 500)
      return res.status(500).send("server error please try again");

    if (pullfromdb == 404) return res.status(404).send("user not found");

    return res.status(201).send("file removed");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export {
  DeleteFileController,
  UploadFileController,
  GetFileUrlController,
  FetchAllFileKeysController,
};
