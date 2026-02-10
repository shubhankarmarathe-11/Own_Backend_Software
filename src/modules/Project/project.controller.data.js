import {
  InsertData,
  RetriveData,
  UpdateData,
  DeleteData,
} from "../Project_Data/project.userdata.services.js";
import { EncryptData } from "../../utils/encrypt.js";
import { DecryptData } from "../../utils/Decrypt.js";

const InsertDatacontroller = async (req, res) => {
  try {
    let { project_id, user_id, data } = req.body;
    console.log(data);

    console.log(JSON.stringify(data));

    let encrypt = await EncryptData(JSON.stringify(data));
    console.log(encrypt);

    if (encrypt == false) return res.status(406).send("please try again");
    let insert = await InsertData({
      project_id: project_id,
      user_id: user_id,
      data: encrypt,
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
    let { project_id, user_id } = req.body;
    let retrive = await RetriveData({
      project_id: project_id,
      user_id: user_id,
    });
    if (retrive == null) return res.status(406).send("please try again");
    let arr = [];
    arr.length = 0;
    for (let val of retrive) {
      let decrypt = await DecryptData(val.data);
      if (decrypt == false) return res.status(406).send("please try again");
      let newdata = JSON.parse(decrypt);
      arr.push({ _id: val._id, Data_id: val.Data_Id, data: newdata });
    }

    return res.status(201).send({ data: arr });
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
};

const DeleteDatacontroller = async (req, res) => {
  try {
    let { project_id, user_id, data_id } = req.body;

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
    let { project_id, user_id, data_id, newdata } = req.body;
    let encrypt = await EncryptData(JSON.stringify(newdata));
    if (encrypt == false) return res.status(406).send("please try again");
    let update = await UpdateData({
      project_id: project_id,
      user_id: user_id,
      data_id: data_id,
      updateddata: encrypt,
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
