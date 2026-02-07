import { UserProjectData } from "./project.userdata.model.js";

const CreateDataModel = async (userid, project_id) => {
  try {
    let create = await UserProjectData.create({
      UserID: userid,
      ProjectID: project_id,
    });
    if (create == null) return null;
    await create.save();

    return create._id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const DeleteDataModel = async (userid) => {
  try {
    await UserProjectData.findOneAndDelete({ UserID: userid });
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const DeleteMany = async (project_id) => {
  try {
    await UserProjectData.deleteMany({ ProjectID: project_id });
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// on data crud

const InsertData = async ({ project_id, user_id, data }) => {
  try {
    let FindAndUpdate = await UserProjectData.findOneAndUpdate(
      {
        ProjectID: project_id,
        UserID: user_id,
      },
      { $push: { user_Data: { data: data } } },
      {
        new: true,
        upsert: true,
      },
    );

    if (FindAndUpdate == null) return null;

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const DeleteData = async ({ project_id, user_id, data_id }) => {
  try {
    let FindAndUpdate = await UserProjectData.updateOne(
      { ProjectID: project_id, UserID: user_id, "user_Data.Data_Id": data_id },
      { $pull: { user_Data: { Data_Id: data_id } } },
    );

    if (FindAndUpdate.modifiedCount === 0) return null;

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const RetriveData = async ({ project_id, user_id }) => {
  try {
    let FindAndUpdate = await UserProjectData.findOne({
      ProjectID: project_id,
      UserID: user_id,
    });

    if (FindAndUpdate == null) return null;

    return FindAndUpdate.user_Data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const UpdateData = async ({ project_id, user_id, data_id, updateddata }) => {
  try {
    let FindAndUpdate = await UserProjectData.updateOne(
      {
        ProjectID: project_id,
        UserID: user_id,
        "user_Data.Data_Id": data_id,
      },
      { $set: { "user_Data.$.data": updateddata } },
    );

    if (FindAndUpdate.matchedCount === 0) return null;
    if (FindAndUpdate.modifiedCount === 0) return false;
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  CreateDataModel,
  DeleteDataModel,
  DeleteMany,
  InsertData,
  DeleteData,
  RetriveData,
  UpdateData,
};
