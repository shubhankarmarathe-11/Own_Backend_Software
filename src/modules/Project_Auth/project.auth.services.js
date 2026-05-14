import { ProjectAuthModel } from "./project.auth.model.js";
import {
  DeleteDataModel,
  CreateDataModel,
  DeleteMany,
} from "../Project_Data/project.userdata.services.js";

// services for model CURD
const CreateauthModel = async ({ project_id }) => {
  try {
    let create = await ProjectAuthModel.create({ ProjectId: project_id });
    if (create == null) return null;

    await create.save();

    return create._id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const DeleteauthModel = async ({ project_id }) => {
  try {
    let deleteData = await DeleteMany(project_id);
    if (deleteData == null) return null;
    await ProjectAuthModel.findOneAndDelete({ ProjectId: project_id });
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// services for User CURD
const AddUser = async ({ project_id, userdata }) => {
  try {
    let FindAndUpdate = await ProjectAuthModel.findOneAndUpdate(
      {
        ProjectId: project_id,
      },
      { $push: { userAuthdata: { data: userdata } } },
      { new: true },
    );

    if (FindAndUpdate == null) return false;

    let UserId =
      FindAndUpdate.userAuthdata[FindAndUpdate.userAuthdata.length - 1].UserID;

    let data = await CreateDataModel(UserId, project_id);

    if (data == null) {
      let result = await ProjectAuthModel.updateOne(
        { ProjectId: project_id, "userAuthdata.UserID": UserId },
        { $pull: { userAuthdata: { UserID: UserId } } },
      );
      if (result.acknowledged === 1) return false;
    }

    return String(UserId);
  } catch (err) {
    console.log(err);

    return null;
  }
};

const UpdateUser = async ({ project_id, user_id, userdata }) => {
  try {
    let Find = await ProjectAuthModel.updateOne(
      {
        ProjectId: project_id,
        "userAuthdata.UserID": user_id,
      },
      { $set: { "userAuthdata.$.data": userdata } },
    );
    if (Find.matchedCount === 0) return null;

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const RemoveUser = async ({ project_id, user_id }) => {
  try {
    let FindAndRemove = await ProjectAuthModel.updateOne(
      {
        ProjectId: project_id,
        "userAuthdata.UserID": user_id,
      },
      { $pull: { userAuthdata: { UserID: user_id } } },
    );

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const FindUserAndAuth = async ({ project_id, userdata }) => {
  try {
    let keys = Object.keys(userdata);
    let FindUserAuth = await ProjectAuthModel.findOne({
      ProjectId: project_id,
    });
    if (FindUserAuth == null) return null;

    const matchedUser = FindUserAuth.userAuthdata.find((user) =>
      keys.every((key) => user.data[key] === userdata[key]),
    );

    if (!matchedUser) return null;

    return matchedUser.UserID;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  CreateauthModel,
  DeleteauthModel,
  AddUser,
  UpdateUser,
  RemoveUser,
  FindUserAndAuth,
};
