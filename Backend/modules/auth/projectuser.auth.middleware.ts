import type { Request, Response, NextFunction } from "express";
import { AUTH_REGEX } from "../../utils/FormatCheckers.ts";
import { ValidatePUserIDService } from "../../Service/Projectuser.Services.ts";

async function ValidateAuthData(
  req: Request,
  res: Response,
  Next: NextFunction,
) {
  try {
    let { AuthData } = req.body;

    if (Object.prototype.toString.call(AuthData) !== "[object Object]")
      return res.status(401).send("please enter proper authData object");

    if (!AuthData || Object.keys(AuthData).length == 0)
      return res.status(401).send("please enter proper authData object");

    if (
      !Object.hasOwn(AuthData, "Identifiers") ||
      AuthData.Identifiers.length == 0
    )
      return res
        .status(401)
        .send("authData object requires array of identifiers keys");

    if (Object.hasOwn(AuthData, "Email")) {
      if (!AUTH_REGEX.email.test(AuthData.Email))
        return res.status(401).send("please enter proper email");
    }
    if (Object.hasOwn(AuthData, "Name")) {
      if (!AUTH_REGEX.name.test(AuthData.Name))
        return res.status(401).send("only letters & 2-50 characters allowed.");
    }
    if (Object.hasOwn(AuthData, "UserName")) {
      if (!AUTH_REGEX.username.test(AuthData.UserName))
        return res
          .status(401)
          .send(
            "letters, numbers, underscore, dot, 3–20 chars are allowed without spaces",
          );
    }
    if (Object.hasOwn(AuthData, "Password")) {
      if (!AUTH_REGEX.password.test(AuthData.Password))
        return res
          .status(401)
          .send(
            "Password must contain min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
          );
    }
    if (Object.hasOwn(AuthData, "Phone")) {
      if (!AUTH_REGEX.phone.test(AuthData.Phone))
        return res
          .status(401)
          .send(
            "Indian mobile numbers (10 digits, optionally starts with +91 or 0)",
          );
    }

    Next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function ValidatePUserId(
  req: Request,
  res: Response,
  Next: NextFunction,
) {
  try {
    let PuserId = req.PuserId;

    let Validate = await ValidatePUserIDService(String(PuserId));

    if (Validate == 500)
      return res.status(500).send("server error please try again");

    if (Validate == 404) return res.status(401).send("userId is not valid");

    Next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function ValidateLoginData(
  req: Request,
  res: Response,
  Next: NextFunction,
) {
  try {
    let { LoginAuthData } = req.body;

    if (Object.prototype.toString.call(LoginAuthData) !== "[object Object]")
      return res.status(401).send("please enter proper authData object");

    if (!LoginAuthData || Object.keys(LoginAuthData).length == 0)
      return res.status(401).send("please enter proper authData object");

    if (
      !Object.hasOwn(LoginAuthData, "Identifiers") ||
      LoginAuthData.Identifiers.length == 0
    )
      return res
        .status(401)
        .send("authData object requires array of identifiers keys");

    for (let i of Object.keys(LoginAuthData)) {
      if (Object.hasOwn(LoginAuthData, i) && i == "Email") {
        if (!AUTH_REGEX.email.test(LoginAuthData.Email))
          return res.status(401).send("please enter proper email");
      }
      if (Object.hasOwn(LoginAuthData, i) && i == "Name") {
        if (!AUTH_REGEX.name.test(LoginAuthData.Name))
          return res
            .status(401)
            .send("only letters & 2-50 characters allowed.");
      }
      if (Object.hasOwn(LoginAuthData, i) && i == "UserName") {
        if (!AUTH_REGEX.username.test(LoginAuthData.UserName))
          return res
            .status(401)
            .send(
              "letters, numbers, underscore, dot, 3–20 chars are allowed without spaces",
            );
      }
      if (Object.hasOwn(LoginAuthData, i) && i == "Password") {
        if (!AUTH_REGEX.password.test(LoginAuthData.Password))
          return res
            .status(401)
            .send(
              "Password must contain min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
            );
      }
      if (Object.hasOwn(LoginAuthData, i) && i == "Phone") {
        if (!AUTH_REGEX.phone.test(LoginAuthData.Phone))
          return res
            .status(401)
            .send(
              "Indian mobile numbers (10 digits, optionally starts with +91 or 0)",
            );
      }
    }

    Next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export { ValidateAuthData, ValidatePUserId, ValidateLoginData };
