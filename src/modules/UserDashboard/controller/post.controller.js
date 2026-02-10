import {
  RegisterNewProject,
  DeleteProjectWithId,
} from "../../Project/project.services.js";
import { VerifyToken } from "../../../utils/jwt.js";

const CreateProjectController = async (req, res) => {
  try {
    let { projectName } = req.body;
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please login back");

    let result;
    result = await VerifyToken(String(token));
    if (result.status == true) {
      req.userId = String(result.payload.id);
      result = await RegisterNewProject({
        projectname: String(projectName),
        userid: req.userId,
      });
      if (result == null) return res.status(400).send("please try again");
      if (result == false) return res.status(406).send("project already exist");

      return res.status(201).send("new project created");
    }
    return res.status(401).send("Token expired please login back");
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

const DeleteProjectController = async (req, res) => {
  try {
    let { project_id } = req.body;
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please login back");
    let result;
    result = await VerifyToken(String(token));
    if (result.status == true) {
      result = await DeleteProjectWithId({
        project_id: project_id,
        userId: String(result.payload.id),
      });
      if (result == null) return res.status(400).send("please try again");
      if (result == false) return res.status(406).send("project not found");

      return res.status(201).send("project deleted");
    }
    return res.status(401).send("Token expired please login back");
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

export { CreateProjectController, DeleteProjectController };
