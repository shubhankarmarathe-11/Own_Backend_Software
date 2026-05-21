import type { Request, Response } from "express";
import { PSignAToken } from "../../utils/TokenFunction.ts";
import { RedisCli } from "../../config/RedisConnection.ts";

export async function GenerateProjectAccessToken(req: Request, res: Response) {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    const userId = await req.PuserId;
    let { Atoken } = await PSignAToken(userId);

    if (Atoken == undefined) {
      res.clearCookie("host_project_auth_access");
      res.clearCookie("host_project_auth_refresh");
      return res.status(400).send("server error please try again");
    }

    res.cookie("host_project_auth_access", Atoken, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });

    req.AToken = Atoken;

    res.status(201).send({ success: true });
  } catch (error) {
    return res.status(500).send("server error please try again");
  }
}
