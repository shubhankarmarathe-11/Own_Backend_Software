import crypto from "crypto";
import fs from "fs";

const publicKey = fs.readFileSync("public.pem", "utf8");
const privateKey = fs.readFileSync("private.pem", "utf8");

const EncryptData = async (data) => {
  try {
    const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(data)
    );

    return encryptedData.toString("base64");
  } catch (error) {
    return false;
  }
};

export { EncryptData };
