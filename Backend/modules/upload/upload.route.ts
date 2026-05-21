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
import { ValidateProjectRefreshToken } from "../Token/Token.middleware.ts";

const FileRouter = express.Router();

FileRouter.post(
  "/uploadfile/upload/:projectId/",
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  upload.single("file"),
  UploadFileController,
);
FileRouter.get(
  "/uploadfile/getfileurl/:projectId/:key",
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  GetFileUrlController,
);
FileRouter.get(
  "/uploadfile/fetchall/:projectId/",
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  FetchAllFileKeysController,
);

FileRouter.delete(
  "/uploadfile/deletefile/:projectId/:key",
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  DeleteFileController,
);

export { FileRouter };
