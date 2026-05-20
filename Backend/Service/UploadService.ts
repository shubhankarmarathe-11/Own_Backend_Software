import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/S3.ts";
import { v4 as uuid } from "uuid";

export const uploadToS3 = async (file: any) => {
  const BUCKET = process.env.AWS_BUCKET;

  try {
    const key = `${uuid()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return key;
  } catch (error) {
    console.error(error);
    return 500;
  }
};

export const getSignedFileUrl = async (key) => {
  const BUCKET = process.env.AWS_BUCKET;

  try {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return await getSignedUrl(s3, command, { expiresIn: 3600 });
  } catch (error) {
    console.error(error);
    return 500;
  }
};

export const deleteFromS3 = async (key) => {
  const BUCKET = process.env.AWS_BUCKET;

  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
    return 200;
  } catch (error) {
    console.error(error);
    return 500;
  }
};
