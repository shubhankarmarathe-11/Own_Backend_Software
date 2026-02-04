import {
  RegisterNewProject,
  DeleteProjectWithId,
} from "../../Project/project.services.js";

const CreateProjectController = async () => {
  try {
    let { projectName } = req.body;

    let result;
    result = await RegisterNewProject({
      projectname: String(projectName),
      userid: req.userId,
    });
    if (result == null) return res.status(400).send("please try again");

    return res.status(201).send("new project created");
  } catch (error) {
    console.log(error);
    return res.status(201).send("please try again");
  }
};

const DeleteProjectController = async () => {
  try {
    let { project_id, projectservice_id } = req.body;

    let result;
    result = await DeleteProjectWithId({
      project_id: project_id,
      projectservice_id: projectservice_id,
      userId: req.userId,
    });
    if (result == null) return res.status(400).send("please try again");

    return res.status(201).send("new project created");
  } catch (error) {
    console.log(error);
    return res.status(201).send("please try again");
  }
};

export { CreateProjectController, DeleteProjectController };
