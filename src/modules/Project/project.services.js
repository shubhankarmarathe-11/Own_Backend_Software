import { ProjectModel, ProjectServicesModel } from "./project.model.js";
import {
  AddProjectId,
  RemoveProjectId,
} from "../MasterAuth/master_auth.services.js";
import {
  CreateauthModel,
  DeleteauthModel,
} from "../Project_Auth/project.auth.services.js";

const RegisterNewProject = async ({ projectname, userid }) => {
  try {
    let result = await ProjectModel.findOne({ ProjectName: projectname });
    if (result != null) return false;
    let Register = await ProjectModel.create({
      ProjectName: String(projectname),
      UserID: String(userid),
    });

    result = await AddProjectId({
      _id: userid,
      projectId: Register._id,
    });

    if (result == null) {
      await ProjectModel.findByIdAndDelete(Register._id);
      return null;
    }

    let RegisterService = await ProjectServicesModel.create({
      ProjectId: Register._id,
    });
    await RegisterService.save();

    Register.ProjectServices = await RegisterService._id;

    result = await CreateauthModel({ project_id: Register._id });

    if (result == null) {
      await ProjectModel.findByIdAndDelete(Register._id);
      await ProjectServicesModel.findByIdAndDelete(RegisterService._id);
      return null;
    }
    Register.ProjectAuth = await result;
    await Register.save();
    return String(Register._id);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const DeleteProjectWithId = async ({ project_id, userId }) => {
  try {
    let deleteDocument;

    deleteDocument = await RemoveProjectId({
      _id: userId,
      projectId: project_id,
    });
    if (deleteDocument == null) return null;
    deleteDocument = await DeleteauthModel({ project_id: project_id });
    if (deleteDocument == null) return null;
    deleteDocument = await ProjectModel.findByIdAndDelete(project_id);
    if (deleteDocument == null) return false;

    deleteDocument = await ProjectServicesModel.deleteOne({
      ProjectId: project_id,
    });

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const GetProjectDetails = async (_id) => {
  try {
    let result;
    result = await ProjectModel.findById(_id).populate([
      { path: "ProjectServices" },
      { path: "ProjectAuth" },
    ]);

    if (result == null) return null;

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { RegisterNewProject, DeleteProjectWithId, GetProjectDetails };
