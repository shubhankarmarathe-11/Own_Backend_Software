import { MasterUserModel } from "../model/masterSchema.ts";
import { MongoClient, ObjectId } from "mongodb";

import bcrypt from "bcryptjs";

async function isUserExist(email: string) {
  try {
    const FetchData = await MasterUserModel.findOne({ Email: email });

    if (FetchData == null) return false;

    return FetchData;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

interface CreateUsertype {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

async function CreateUser({ email, name, picture, sub }: CreateUsertype) {
  let CreateUser;
  try {
    CreateUser = await MasterUserModel.create({
      GoogleId: sub,
      Email: email,
      Name: name,
      ProfileUrl: picture,
    });

    await CreateUser.save();

    return CreateUser;
  } catch (error) {
    console.error(error);
    if (CreateUser?._id) {
      await MasterUserModel.deleteOne({ _id: CreateUser?._id });
      return 500;
    }
    return 500;
  }
}

interface LoginUsertype {
  email: string;
  password: string;
}

async function LoginUserService({ email, password }: LoginUsertype) {
  try {
    let FetchUser = await MasterUserModel.findOne({ Email: email });
    if (FetchUser == null) return 404;

    const isCorrect = await bcrypt.compare(password, FetchUser.Password);
    if (isCorrect == false) return 401;

    return FetchUser;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

interface SignupUserType {
  name: string;
  email: string;
  password: string;
}

async function SignupUserService({ name, email, password }: SignupUserType) {
  let CreateNewUser;
  try {
    const isExist = await MasterUserModel.findOne({ Email: email });
    if (isExist != null) return 409;

    const hashPass = await bcrypt.hash(password, 10);
    if (!hashPass) return 500;

    CreateNewUser = await MasterUserModel.create({
      Name: name,
      Email: email,
      Password: hashPass,
    });
    await CreateNewUser.save();

    return CreateNewUser;
  } catch (error) {
    console.error(error);
    if (CreateNewUser?._id) {
      await MasterUserModel.deleteOne({ Email: email });
      return 500;
    }
    return 500;
  }
}

async function DeleteUserService(userId: string) {
  const client = new MongoClient(
    "mongodb://localhost:27017/BAAS?replicaSet=rs0&retryWrites=false",
  );

  try {
    await client.connect();
  } catch (error) {
    console.error(error);
    return 500;
  }

  const db = client.db("BAAS");

  const Projects = db.collection("projectmodels");
  const ProjectsUser = db.collection("projectusermodels");
  const MasterUser = db.collection("masterusermodels");

  const session = client.startSession();

  try {
    session.startTransaction();

    await Projects.deleteMany({ CreatedBy: new ObjectId(userId) }, { session });

    await ProjectsUser.deleteMany(
      { Project_Creator: new ObjectId(userId) },
      { session },
    );

    await MasterUser.deleteOne({ _id: new ObjectId(userId) }, { session });

    await session.commitTransaction();

    return 200;
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return 500;
  } finally {
    await session.endSession();

    await client.close();
  }
}

export {
  isUserExist,
  CreateUser,
  LoginUserService,
  SignupUserService,
  DeleteUserService,
};
