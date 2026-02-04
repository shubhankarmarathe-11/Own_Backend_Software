import { VerifyToken } from "../../../utils/jwt.js";
import { GetUserWithid } from "../../MasterAuth/master_auth.services.js";
import { GetProjectDetails } from "../../Project/project.services.js";

const GetProfileController = async (req, res) => {
  try {
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please login back");

    let result;
    result = await VerifyToken(String(token));
    if (result.status == true) {
      req.userId = String(result.payload.id);
      result = await GetUserWithid(String(result.payload.id));
      if (result == null) return res.status(406).send("user not found");

      return res.status(201).send({ profileData: result });
    }

    return res.status(401).send("Token expired please login back");
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

const GetAllProjects = async () => {
  try {
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please login back");

    let result;
    result = await VerifyToken(String(token));
    if (result.status == true) {
      req.userId = String(result.payload.id);
      result = await GetUserWithid(String(result.payload.id));
      if (result == null) return res.status(406).send("user not found");

      return res.status(201).send({ Projects: result.ProjectId });
    }

    return res.status(401).send("Token expired please login back");
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

const GetProjectDetailController = async () => {
  try {
    let token = req.cookies["host_auth"];
    let { _id } = req.params;
    if (token == undefined) return res.status(401).send("please login back");

    let result;
    result = await VerifyToken(String(token));
    if (result.status == true) {
      req.userId = String(result.payload.id);
      result = await GetProjectDetails(String(_id));
      if (result == null) return res.status(406).send("Project not found");

      return res.status(201).send({ ProjectData: result });
    }

    return res.status(401).send("Token expired please login back");
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

export { GetProfileController, GetAllProjects, GetProjectDetailController };
