import type { NextFunction, Request, Response } from "express";

async function ValidateInputData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let { UserData } = req.body;

    if (!UserData) return res.status(401).send("please send proper data");

    UserData = JSON.stringify(UserData);

    req.UserData = UserData;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export { ValidateInputData };
