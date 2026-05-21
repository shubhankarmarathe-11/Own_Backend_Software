import { ProjectModel } from "../model/ProjectSchema.ts";
import { MasterUserModel } from "../model/masterSchema.ts";
import { MongoClient, ObjectId } from "mongodb";

interface CreateProjectType {
  userId: string;
  projectname: string;
}

async function FetchAllProjects(userId: string) {
  try {
    const FetchAll = await ProjectModel.find({ CreatedBy: userId }).populate(
      "ProjectUsers",
    );

    return FetchAll;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

async function FetchProjectsDetailService(projectId: string) {
  try {
    const FetchAll = await ProjectModel.findOne({ _id: projectId }).populate(
      "ProjectUsers",
    );

    if (FetchAll == null) return 404;

    return FetchAll;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

async function CreateProject({ userId, projectname }: CreateProjectType) {
  const client = new MongoClient(`${process.env.MongoUri}`);

  try {
    await client.connect();
  } catch (error) {
    console.error(error);
    return 500;
  }

  const FetchName = await ProjectModel.findOne({ Name: projectname });

  if (FetchName != null) return 401;

  const db = client.db("BAAS");

  const Projects = db.collection("projectmodels");
  const MasterUser = db.collection("masterusermodels");

  const session = client.startSession();

  try {
    session.startTransaction();

    let project = await Projects.insertOne(
      { Name: projectname, CreatedBy: new ObjectId(userId) },
      { session },
    );

    await MasterUser.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { Projects: project.insertedId } },
      { session },
    );

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

interface DeleteProjectType {
  userId: string;
  projectId: string;
}
async function DeleteProjectService({ userId, projectId }: DeleteProjectType) {
  const client = await new MongoClient(
    "mongodb://localhost:27017/BAAS?replicaSet=rs0&retryWrites=false",
  );

  await client.connect();

  const db = await client.db("BAAS");

  const Projects = db.collection("projectmodels");
  const ProjectsUser = db.collection("projectusermodels");
  const MasterUser = db.collection("masterusermodels");

  const session = client.startSession();

  try {
    session.startTransaction();

    await Projects.deleteOne({ _id: new ObjectId(projectId) }, { session });

    await ProjectsUser.deleteMany(
      { Project_id: new ObjectId(projectId) },
      { session },
    );

    await MasterUser.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { Projects: new ObjectId(projectId) } },
      { session },
    );

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
  CreateProject,
  DeleteProjectService,
  FetchAllProjects,
  FetchProjectsDetailService,
};
