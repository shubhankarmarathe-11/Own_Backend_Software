import type { Request, Response, NextFunction } from "express";
import { ProjectModel } from "../model/ProjectSchema.ts";

export default async function ValidateProjectID(
  req: Request,
  res: Response,
  Next: NextFunction,
) {
  try {
    let { projectId } = req.params;
    if (!projectId) {
      projectId = req.params.projectId;
      if (!projectId)
        return res.status(401).json({ message: "Invalid ProjectId" });
    }

    const Validate = await ProjectModel.findById(projectId);

    if (Validate == null)
      return res.status(401).json({ message: "Invalid ProjectId" });

    req.projectId = await projectId;
    req.project_creator = await Validate.CreatedBy;
    Next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}
