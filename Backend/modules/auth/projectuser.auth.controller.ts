import type { Request, Response } from "express";
import {
  CreateProjectUser,
  UpdatePUserService,
  DeleteProjectuser,
  ValidateLoginCredService,
} from "../../Service/Projectuser.Services.ts";

import bcrypt from "bcryptjs";

async function InsertProjectUserController(req: Request, res: Response) {
  try {
    let { AuthData } = req.body;

    if (Object.hasOwn(AuthData, "Password")) {
      const salt = await bcrypt.genSalt(10);
      AuthData.Password = await bcrypt.hash(AuthData.Password, salt);
    }

    const Insert = await CreateProjectUser({
      projectId: String(req.projectId),
      userId: String(req.project_creator),
      AuthData: AuthData,
      uniqueField: AuthData.uniqueField,
    });

    if (Insert.status == 404)
      return res.status(404).send({ res: `${Insert.mess}` });

    if (Insert == "Crypto error" || Insert == 500)
      return res.status(500).send("server error please try again");

    return res.status(201).send({ res: `User Created. UserId - ${Insert}` });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function UpdateProjectUserController(req: Request, res: Response) {
  try {
    let { AuthData } = req.body;
    let { PuserId } = req.params;

    if (Object.hasOwn(AuthData, "Password")) {
      const salt = await bcrypt.genSalt(10);
      AuthData.Password = await bcrypt.hash(AuthData.Password, salt);
    }

    const Update = await UpdatePUserService(
      String(req.projectId),
      String(PuserId),
      AuthData,
    );

    if (Update == 500)
      return res.status(500).send("server error please try again");

    return res.status(201).send({ res: `User Auth Data Updated` });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function DeleteProjectUserController(req: Request, res: Response) {
  try {
    let { PuserId } = req.params;

    const Delete = await DeleteProjectuser(
      String(req.projectId),
      String(PuserId),
    );

    if (Delete == 500)
      return res.status(500).send("server error please try again");

    return res.status(201).send({ res: `User Removed` });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function LoginProjectUserController(req: Request, res: Response) {
  try {
    let { LoginAuthData } = req.body;

    const LoginCred = await ValidateLoginCredService({
      authdata: LoginAuthData,
      Identifiers: LoginAuthData.Identifiers,
    });

    if (LoginCred == 500)
      return res.status(500).send("server error please try again");

    if (LoginCred.status == 404) return res.status(404).send("user not found");

    if (LoginCred.status == 401)
      return res.status(401).send(`${LoginCred.mess}`);

    if (LoginCred.status == 200)
      return res
        .status(201)
        .send({ res: `User Found. UserId - ${LoginCred.mess}` });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export {
  InsertProjectUserController,
  UpdateProjectUserController,
  DeleteProjectUserController,
  LoginProjectUserController,
};
