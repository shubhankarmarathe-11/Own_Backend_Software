import { MasterAuth } from "./master_auth.model.js";
import bcrypt from "bcryptjs";
import { SignNewToken } from "../../utils/jwt.js";

const RegisterUser = async ({ username, email, number, password }) => {
  try {
    let hashedPassword = await bcrypt.hash(String(password), 10);

    const CreateUser = await MasterAuth.create({
      Username: String(username),
      Email: String(email),
      MobileNumber: String(number),
      Password: String(hashedPassword),
    });

    await CreateUser.save();

    if (CreateUser != null) {
      let result = await SignNewToken(String(CreateUser._id));
      if (result == false) return false;

      return String(result);
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ValidateCred = async ({ email, password }) => {
  try {
    let isUser = await MasterAuth.findOne({ Email: String(email) });

    if (isUser == null) return null;

    let comparePassword = await bcrypt.compare(
      String(password),
      isUser.Password,
    );

    if (comparePassword) {
      let result = await SignNewToken(String(isUser._id));
      if (result == false) return null;

      return String(result);
    }

    return false;
  } catch (error) {
    return null;
  }
};

const GetUserWithid = async ({ _id }) => {
  try {
    let FindUser = await MasterAuth.findById(String(_id), {
      Password: 0,
    }).populate("ProjectId", "ProjectName");

    if (isUser == null) return null;

    return FindUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const AddProjectId = async ({ _id, projectId }) => {
  try {
    let Update = await MasterAuth.findByIdAndUpdate(_id, {
      $push: { ProjectId: projectId },
    });
    await Update.save();

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const RemoveProjectId = async ({ _id, projectId }) => {
  try {
    let Update = await MasterAuth.findByIdAndUpdate(_id, {
      $pull: { ProjectId: projectId },
    });
    await Update.save();

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const FindUserAndUpdate = async ({
  _id,
  username,
  email,
  number,
  password,
}) => {
  try {
    let hashedPassword = await bcrypt.hash(String(password), 10);

    let update = await MasterAuth.findByIdAndUpdate(_id, {
      Username: String(username),
      Email: String(email),
      MobileNumber: String(number),
      Password: String(hashedPassword),
    });

    if (update == null) return null;

    await update.save();

    return true;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export {
  RegisterUser,
  ValidateCred,
  GetUserWithid,
  AddProjectId,
  RemoveProjectId,
  FindUserAndUpdate,
};
