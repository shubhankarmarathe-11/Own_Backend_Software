import type { Request, Response } from "express";
import {
  InsertDataService,
  RetriveDataService,
} from "../../Service/ProjectUserData.Services.ts";

async function InsertUserDataController(req: Request, res: Response) {
  try {
    let PuserId = req.PuserId;

    const Insert = await InsertDataService({
      PuserId: String(PuserId),
      userData: String(req.UserData),
    });

    if (Insert == 500)
      return res.status(500).send("server error please try again");

    if (Insert == 404) return res.status(404).send("user not found");

    return res.status(201).send("Data inserted");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function RetriveUserDataController(req: Request, res: Response) {
  try {
    let PuserId = req.PuserId;

    const Retrive = await RetriveDataService(String(PuserId));

    if (Retrive == 500)
      return res.status(500).send("server error please try again");

    if (Retrive == 404) return res.status(404).send("user not found");

    return res.status(200).send({ data: Retrive });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export { InsertUserDataController, RetriveUserDataController };
