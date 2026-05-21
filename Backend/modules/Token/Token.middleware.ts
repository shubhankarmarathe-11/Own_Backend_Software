import type { Request, Response, NextFunction } from "express";
import { VerifyToken } from "../../utils/TokenFunction.ts";

export async function ValidateProjectRefreshToken(
  req: Request,
  res: Response,
  Next: NextFunction,
) {
  try {
    const refreshToken = req.cookies.host_project_auth_refresh;
    if (!refreshToken) {
      res.clearCookie("host_project_auth_access");
      res.clearCookie("host_project_auth_refresh");
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    let result = await VerifyToken(String(refreshToken));

    if (result.payload?.type != "refresh" || result == undefined) {
      res.clearCookie("host_project_auth_access");
      res.clearCookie("host_project_auth_refresh");
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    req.PuserId = await result.payload?.PuserId;
    Next();
  } catch (error) {
    return res.status(500).send("server error please try again");
  }
}
