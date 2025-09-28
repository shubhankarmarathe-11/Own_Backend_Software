import { createSecretKey } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { BlacklistedTokens } from "../Schemas/BlacklistTokens.js";
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
      .setExpirationTime("1d")
      .sign(JWT_SECRET);

    return Token;
  } catch (error) {
    return false;
  }
}

async function VerifyToken(Token) {
  try {
    let { payload } = await jwtVerify(String(Token), JWT_SECRET, {
      issuer: process.env.JWT_ISSUER, // issuer
      audience: process.env.JWT_AUDIENCE, // audience
    });

    let resultarr = await BlacklistedTokens.findOne({ Token: Token });
    if (resultarr == null) {
      return { status: true, payload: payload };
    } else {
      return { status: false, payload: null };
    }
  } catch (error) {
    if (error.code == "ERR_JWT_EXPIRED") {
      await BlacklistedTokens.findOneAndDelete({ Token: Token });
    }
    return { status: false, payload: null };
  }
}

async function BlaklistTokenonLogout(Token) {
  try {
    let storetoken = await BlacklistedTokens.create({ Token: Token });
    await storetoken.save();
    return true;
  } catch (error) {
    return false;
  }
}

export { SignNewToken, VerifyToken, BlaklistTokenonLogout };
