import type { Request, Response } from "express";
import { isUserExist, CreateUser } from "../../Service/MasterUser.Services.ts";
import { SignToken } from "../../utils/TokenFunction.ts";
import { RedisCli } from "../../config/RedisConnection.ts";

const GoogleTokenController = async (req: Request, res: Response) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    const TokenData = req.gToken;

    const payload = TokenData.getPayload();

    const { email } = payload;

    let isExist: any;
    let userDetails: {};

    isExist = await isUserExist(email);
    if (isExist == 500)
      return res.status(500).send("server error please try again");

    if (isExist == false) {
      let { email, name, picture, sub } = payload;

      isExist = await CreateUser({
        email: String(email),
        name: String(name),
        picture: String(picture),
        sub: String(sub),
      });
      if (isExist == 500)
        return res.status(500).send("server error please try again");
    }

    userDetails = await isExist;

    let { Atoken, Rtoken } = await SignToken(String(userDetails._id));

    if (Atoken == undefined || Rtoken == undefined)
      return res.status(401).send("please try again");

    res.cookie("host_auth_access", Atoken, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });
    res.cookie("host_auth_refresh", Rtoken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });

    await RedisCli.set(
      `${userDetails._id}`,
      JSON.stringify({
        _id: userDetails._id,
        name: userDetails.Name,
        email: userDetails.Email,
        profileimg: userDetails.ProfileUrl,
        Projects: JSON.stringify(userDetails.Projects),
      }),
    );

    res.status(201).send("login successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
};

export { GoogleTokenController };
