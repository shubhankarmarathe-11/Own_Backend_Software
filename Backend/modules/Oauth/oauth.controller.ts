import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

async function ValidateToken(req: Request, res: Response) {
  try {
    let { google_token, GOOGLE_CLIENT_ID } = req.body;
    const isProduction = process.env.NODE_ENV === "production";

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    let Token: any;
    try {
      Token = await client.verifyIdToken({
        idToken: google_token,
        audience: GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      return res.status(401).send("invalid token or client id");
    }

    const payload = Token.getPayload();

    const { email, picture, sub, name } = payload;

    return res
      .status(201)
      .send({
        data: { Email: email, Name: name, googleId: sub, profileurl: picture },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export { ValidateToken };
