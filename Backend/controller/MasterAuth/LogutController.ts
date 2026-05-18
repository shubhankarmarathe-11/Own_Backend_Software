import type { Request, Response } from "express";
import { RedisCli } from "../../config/RedisConnection.ts";

async function LogoutController(req: Request, res: Response) {
  try {
    await RedisCli.del(`${String(req.userId)}`);

    res.clearCookie("host_auth_access");
    res.clearCookie("host_auth_refresh");

    res.status(201).send("success");
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
}

export { LogoutController };
