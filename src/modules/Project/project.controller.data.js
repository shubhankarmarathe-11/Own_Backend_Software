import {
  InsertData,
  RetriveData,
  UpdateData,
  DeleteData,
} from "../Project_Data/project.userdata.services";

const InsertDatacontroller = async (req, res) => {
  try {
    let { project_id, user_id } = req.params;
    let { data } = req.body;
    let insert = await InsertData({
      project_id: project_id,
      user_id: user_id,
      data: data,
    });
    if (insert == null) return res.status(406).send("please try again");

    return res.status(201).send("Data inserted");
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

const RetriveDatacontroller = async (req, res) => {
  try {
    let { project_id, user_id } = req.params;
    let retrive = await RetriveData({
      project_id: project_id,
      user_id: user_id,
    });
    if (retrive == null) return res.status(406).send("please try again");

    return res.status(201).send({ data: retrive });
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

const DeleteDatacontroller = async (req, res) => {
  try {
    let { project_id, user_id, data_id } = req.params;

    let deletedata = await DeleteData({
      project_id: project_id,
      user_id: user_id,
      data_id: data_id,
    });
    if (deletedata == null) return res.status(406).send("please try again");

    return res.status(201).send("Data Removed");
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

const UpdateDatacontroller = async (req, res) => {
  try {
    let { project_id, user_id, data_id } = req.params;
    let { newdata } = req.body;
    let update = await UpdateData({
      project_id: project_id,
      user_id: user_id,
      data_id: data_id,
      updateddata: newdata,
    });

    if (update == null) return res.status(406).send("please try again");

    return res.status(201).send("Data Updated");
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

export {
  DeleteDatacontroller,
  InsertDatacontroller,
  UpdateDatacontroller,
  RetriveDatacontroller,
};
