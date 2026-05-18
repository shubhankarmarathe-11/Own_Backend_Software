import { OAuth2Client } from "google-auth-library";
import type { Request, Response, NextFunction } from "express";

const validateGoogleToken = async (
  req: Request,
  res: Response,
  Next: NextFunction,
) => {
  try {
    let { google_token } = req.body;
    const isProduction = process.env.NODE_ENV === "production";

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    let Token: any;
    try {
      Token = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      return res.status(401).send("invalid token");
    }

    req.gToken = Token;
    Next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
};

export { validateGoogleToken };
