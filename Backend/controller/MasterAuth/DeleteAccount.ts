import type { Request, Response } from "express";
import { RedisCli } from "../../config/RedisConnection.ts";
import { DeleteUserService } from "../../Service/MasterUser.Services.ts";

async function DeleteUserController(req: Request, res: Response) {
  try {
    let Delete = await DeleteUserService(String(req.userId));

    if (Delete == 500)
      return res.status(500).send("server error please try again");

    await RedisCli.del(`${String(req.userId)}`);

    res.clearCookie("host_auth_access");
    res.clearCookie("host_auth_refresh");

    res.status(201).send("success");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export { DeleteUserController };
