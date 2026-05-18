import type { Request, Response, NextFunction } from "express";
import { FetchProjectsDetailService } from "../../Service/Project.Services.ts";

async function ValidateProjectId(
  req: Request,
  res: Response,
  Next: NextFunction,
) {
  try {
    let { projectId } = req.params;

    const fetchDetail = await FetchProjectsDetailService(String(projectId));

    if (fetchDetail == 500)
      return res.status(500).send("server error please try again");

    if (fetchDetail == 404) return res.status(401).send("Invalid Project Id");

    Next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export { ValidateProjectId };
