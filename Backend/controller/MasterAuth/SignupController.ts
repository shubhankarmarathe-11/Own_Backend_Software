import type { Request, Response } from "express";
import { SignupUserService } from "../../Service/MasterUser.Services.ts";
import { SignToken } from "../../utils/TokenFunction.ts";
import { RedisCli } from "../../config/RedisConnection.ts";
import { AUTH_REGEX } from "../../utils/FormatCheckers.ts";

async function SignupController(req: Request, res: Response) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    let { name, email, password } = req.body;

    if (!AUTH_REGEX.name.test(name))
      return res.status(401).send("only letters & 2-50 characters allowed.");
    if (!AUTH_REGEX.email.test(email))
      return res.status(401).send("please enter proper email");
    if (!AUTH_REGEX.password.test(password))
      return res
        .status(401)
        .send(
          "Password must contain min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
        );

    const CreateNew = await SignupUserService({
      email: email,
      name: name,
      password: password,
    });

    if (CreateNew == 500)
      return res.status(500).send("server error please try again");

    if (CreateNew == 409)
      return res.status(409).send("please use different email");

    let { Atoken, Rtoken } = await SignToken(String(CreateNew._id));

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
      `${CreateNew._id}`,
      JSON.stringify({
        _id: CreateNew._id,
        name: CreateNew.Name,
        email: CreateNew.Email,
        profileimg: CreateNew.ProfileUrl,
        Projects: JSON.stringify(CreateNew.Projects),
      }),
    );

    res.status(201).send("login successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export { SignupController };
