import type { Request, Response } from "express";
import {
  CreateProject,
  DeleteProjectService,
  FetchAllProjects,
  FetchProjectsDetailService,
} from "../../Service/Project.Services.ts";
import { ValidatePUserIDService } from "../../Service/Projectuser.Services.ts";

async function CreateprojectController(req: Request, res: Response) {
  try {
    let { projectName } = req.body;

    const CreateAndAdd = await CreateProject({
      projectname: String(projectName),
      userId: String(req.userId),
    });

    if (CreateAndAdd == 401)
      return res.status(401).send("please use different projectname .");

    if (CreateAndAdd == 500)
      return res.status(500).send("server error please try again");

    return res.status(201).send("project Created");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function FetchprojectsController(req: Request, res: Response) {
  try {
    let userId = req.userId;

    const FetchAll = await FetchAllProjects(String(userId));

    if (FetchAll == 500)
      return res.status(500).send("server error please try again");

    if (FetchAll.length == 0) return res.status(200).send("no projects found");

    return res.status(200).send({ data: FetchAll });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function FetchprojectDetailController(req: Request, res: Response) {
  try {
    let { projectId } = req.params;

    const fetchDetail = await FetchProjectsDetailService(String(projectId));

    if (fetchDetail == 500)
      return res.status(500).send("server error please try again");

    if (fetchDetail == 404) return res.status(404).send("Project not found");

    return res.status(200).send({ data: fetchDetail });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function DeleteprojectController(req: Request, res: Response) {
  try {
    let { projectId } = req.params;

    const DeleteProject = await DeleteProjectService({
      userId: String(req.userId),
      projectId: String(projectId),
    });

    if (DeleteProject == 500)
      return res.status(500).send("server error please try again");

    return res.status(201).send("project Deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

async function FetchProjectUserDetails(req: Request, res: Response) {
  try {
    let { PuserId } = req.body;

    let FetchUser = await ValidatePUserIDService(String(PuserId));

    if (FetchUser == 500)
      return res.status(500).send("server error please try again");

    if (FetchUser == 404) return res.status(401).send("userId is not valid");

    return res.status(200).send({ data: FetchUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error please try again");
  }
}

export {
  CreateprojectController,
  DeleteprojectController,
  FetchprojectsController,
  FetchprojectDetailController,
  FetchProjectUserDetails,
};
