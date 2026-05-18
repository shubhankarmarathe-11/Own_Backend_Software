import type { Request, Response } from "express";
import { LoginUserService } from "../../Service/MasterUser.Services.ts";
import { SignToken } from "../../utils/TokenFunction.ts";
import { RedisCli } from "../../config/RedisConnection.ts";
import { AUTH_REGEX } from "../../utils/FormatCheckers.ts";

async function LoginController(req: Request, res: Response) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    let { email, password } = req.body;

    if (!AUTH_REGEX.email.test(email))
      return res.status(401).send("please enter proper email");
    if (!AUTH_REGEX.password.test(password))
      return res
        .status(401)
        .send(
          "Password must contain min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
        );

    const LoginService = await LoginUserService({
      email: email,
      password: password,
    });

    if (LoginService == 500)
      return res.status(500).send("server error please try again");

    if (LoginService == 404) return res.status(404).send("User not found");

    if (LoginService == 401) return res.status(404).send("Incorrect Password");

    let { Atoken, Rtoken } = await SignToken(String(LoginService._id));

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
      `${LoginService._id}`,
      JSON.stringify({
        _id: LoginService._id,
        name: LoginService.Name,
        email: LoginService.Email,
        profileimg: LoginService.ProfileUrl,
        Projects: JSON.stringify(LoginService.Projects),
      }),
    );

    res.status(201).send("login successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export { LoginController };
