import {
  AddUser,
  UpdateUser,
  RemoveUser,
} from "../Project_Auth/project.auth.services.js";

const CreateNewUsercontroller = async (req, res) => {
  try {
    let { userData } = req.body;
    let { project_id } = req.params;

    let result = await AddUser({ project_id: project_id, userdata: userData });

    if (result == null) return res.status(400).send("please try again");
    if (result == false) return res.status(406).send("Data not found");

    return res.status(201).send({ message: "new user added", user_id: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

const UpdateUsercontroller = async (req, res) => {
  try {
    let { userData } = req.body;
    let { project_id, user_id } = req.params;

    let result = await UpdateUser({
      project_id: project_id,
      user_id: user_id,
      userdata: userData,
    });

    if (result == null) return res.status(400).send("please try again");
    if (result == false) return res.status(406).send("user not found");

    return res.status(201).send("user data updated");
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

const DeleteUsercontroller = async (req, res) => {
  try {
    let { project_id, user_id } = req.params;

    let result = await RemoveUser({ project_id: project_id, user_id: user_id });
    if (result == null) return res.status(400).send("please try again");
    // if (result == false) return res.status(406).send("Data not found");

    return res.status(201).send("user removed");
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

export { CreateNewUsercontroller, UpdateUsercontroller, DeleteUsercontroller };
