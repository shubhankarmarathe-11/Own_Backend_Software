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
import {
  ValidateProjectRefreshToken,
  ValidateProjectAccessToken,
} from "../Token/Token.middleware.ts";

const FileRouter = express.Router();

FileRouter.post(
  "/uploadfile/upload/:projectId/",
  ValidateProjectAccessToken,
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  upload.single("file"),
  UploadFileController,
);
FileRouter.get(
  "/uploadfile/getfileurl/:projectId/:key",
  ValidateProjectAccessToken,
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  GetFileUrlController,
);
FileRouter.get(
  "/uploadfile/fetchall/:projectId/",
  ValidateProjectAccessToken,
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  FetchAllFileKeysController,
);

FileRouter.delete(
  "/uploadfile/deletefile/:projectId/:key",
  ValidateProjectAccessToken,
  ValidateProjectRefreshToken,
  ValidateProjectID,
  ValidatePUserId,
  DeleteFileController,
);

export { FileRouter };
