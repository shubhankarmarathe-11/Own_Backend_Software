import type { Request, Response, NextFunction } from "express";
import { VerifyToken } from "../utils/TokenFunction.ts";

export default async function ValidateAccessToken(
  req: Request,
  res: Response,
  Next: NextFunction,
) {
  try {
    const accessToken = req.cookies.host_auth_access;
    if (!accessToken) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).json({ message: "Invalid token" });
    }
    let result = await VerifyToken(String(accessToken));

    if (result.payload?.type != "access" || result == undefined) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).json({ message: "Invalid token" });
    }

    Next();
  } catch (error) {
    return res.status(500).send("server error please try again");
  }
}
