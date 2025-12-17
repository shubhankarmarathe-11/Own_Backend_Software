import crypto from "crypto";
import fs from "fs";

const publicKey = fs.readFileSync("public.pem", "utf8");
const privateKey = fs.readFileSync("private.pem", "utf8");

const DecryptData = async (data) => {
  try {
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(data, "base64")
    );

    return decryptedData.toString();
  } catch (error) {
    return false;
  }
};

export { DecryptData };
