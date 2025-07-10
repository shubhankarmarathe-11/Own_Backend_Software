import { createSecretKey } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import dotenv from "dotenv";
dotenv.config();

let Key = process.env.JWT_SECRET;

let JWT_SECRET = createSecretKey(String(Key), "utf-8");

async function SignNewToken(id) {
  try {
    let Token = await new SignJWT({ id: String(id) })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setIssuer(process.env.JWT_ISSUER)
      .setAudience(process.env.JWT_AUDIENCE)
      .setExpirationTime("100s")
      .sign(JWT_SECRET);

    return Token;
  } catch (error) {
    return false;
  }
}

async function VerifyToken(Token) {
  try {
    const { payload } = await jwtVerify(String(Token), JWT_SECRET, {
      issuer: process.env.JWT_ISSUER, // issuer
      audience: process.env.JWT_AUDIENCE, // audience
    });
    // log values to console
    return true;
  } catch (error) {
    return false;
  }
}

export { SignNewToken, VerifyToken };
