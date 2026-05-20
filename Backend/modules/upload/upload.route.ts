import express from "express";
import { upload } from "../../config/Multer.ts";
import ValidateProjectID from "../../middleware/ValidateProjectID.ts";
import { ValidatePUserId } from "../auth/projectuser.auth.middleware.ts";

import {
  UploadFileController,
  GetFileUrlController,
  DeleteFileController,
  FetchAllFileKeysController,
} from "./upload.controller.ts";

const FileRouter = express.Router();

FileRouter.post(
  "/uploadfile/upload/:projectId/",
  ValidateProjectID,
  ValidatePUserId,
  upload.single("file"),
  UploadFileController,
);
FileRouter.get(
  "/uploadfile/getfileurl/:projectId/:key",
  ValidateProjectID,
  ValidatePUserId,
  GetFileUrlController,
);
FileRouter.get(
  "/uploadfile/fetchall/:projectId/",
  ValidateProjectID,
  ValidatePUserId,
  FetchAllFileKeysController,
);

FileRouter.delete(
  "/uploadfile/deletefile/:projectId/:key",
  ValidateProjectID,
  ValidatePUserId,
  DeleteFileController,
);

export { FileRouter };
