import type { Request, Response } from "express";
import { SignAToken } from "../utils/TokenFunction.ts";
import { RedisCli } from "../config/RedisConnection.ts";

export default async function GenerateAccessToken(req: Request, res: Response) {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    const userId = await req.userId;
    let { Atoken } = await SignAToken(userId);

    if (Atoken == undefined) {
      await RedisCli.del(`${userId}`);
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(400).send("server error please try again");
    }

    res.cookie("host_auth_access", Atoken, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });

    res.status(201).send({ success: true });
  } catch (error) {
    return res.status(500).send("server error please try again");
  }
}
