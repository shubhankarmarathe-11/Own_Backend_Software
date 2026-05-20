import { ProjectUserModel } from "../model/ProjectuserSchema.ts";
import { ProjectModel } from "../model/ProjectSchema.ts";
import { MongoClient, ObjectId } from "mongodb";
import crypto from "crypto";
import bcrypt from "bcryptjs";

async function ValidatePUserIDService(PuserId: string) {
  try {
    const Fetch = await ProjectUserModel.findById(PuserId);

    if (Fetch == null) return 404;

    return Fetch;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

interface Logintype {
  authdata: object;
  Identifiers: any[];
}
async function ValidateLoginCredService({ authdata, Identifiers }: Logintype) {
  try {
    let query: any = {};
    for (const key of Identifiers) {
      if (key == "Password") continue;
      query[`AuthData.${key}`] = (authdata as any)[`${key}`];
    }

    if (Object.keys(query).length === 0) {
      return { status: 401, mess: "please provide a valid identifier" };
    }

    let Fetch = await ProjectUserModel.findOne(query);
    if (Fetch == null) return { status: 404, mess: "user not found" };

    if (Object.hasOwn(authdata, "Password")) {
      let comparepass = await bcrypt.compare(
        String((authdata as any).Password),
        String(Fetch.AuthData.Password),
      );
      if (!comparepass) return { status: 401, mess: "password not match" };
    }

    return { status: 200, mess: String(Fetch._id) };
  } catch (error) {
    console.error(error);
    return 500;
  }
}

async function UpdatePUserService(
  PuserId: string,
  AuthData: object,
  PrevIdentifiers: string[],
) {
  try {
    let query: any = {};
    for (const key of PrevIdentifiers) {
      if (key == "Password") continue;
      query[`AuthData.${key}`] = (AuthData as any)[`${key}`];
    }

    if (Object.keys(query).length === 0) {
      return { status: 401, mess: "please provide a valid identifier" };
    }

    let Fetch = await ProjectUserModel.findOne(query);
    if (Fetch != null)
      return { status: 404, mess: "user found please use different username" };

    let Update = await ProjectUserModel.updateOne(
      { _id: new ObjectId(PuserId) },
      { $set: { AuthData: AuthData } },
    );

    if (Update.acknowledged == false) return 500;

    if (Update.matchedCount == 1 && Update.modifiedCount == 1) return 200;

    return 500;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

interface CreateProjectusertype {
  projectId: string;
  AuthData: Object;
  userId: string;
  uniqueField: any[];
}

async function CreateProjectUser({
  projectId,
  AuthData,
  userId,
  uniqueField,
}: CreateProjectusertype) {
  let PublicKey;
  let PrivateKey;

  try {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,

      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },

      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    PublicKey = publicKey;
    PrivateKey = privateKey;
  } catch (error) {
    console.error(error);
    return "Crypto error";
  }

  let query: any = {};
  for (const key of uniqueField) {
    if (key == "Password") continue;
    query[`AuthData.${key}`] = (AuthData as any)[`${key}`];
  }

  if (Object.keys(query).length === 0) {
    return { status: 401, mess: "please provide a valid unique field" };
  }

  let Fetch = await ProjectUserModel.findOne(query);
  if (Fetch != null)
    return { status: 404, mess: `please use different unique field data` };

  const client = new MongoClient(`${process.env.MongoUri}`);

  try {
    await client.connect();
  } catch (error) {
    console.error(error);
    return 500;
  }

  const db = await client.db("BAAS");

  const Projects = db.collection("projectmodels");
  const ProjectsUser = db.collection("projectusermodels");

  const session = client.startSession();
  try {
    await session.startTransaction();

    let IsExistUser = await ProjectsUser.findOne({});

    let Insertuser = await ProjectsUser.insertOne(
      {
        Project_id: new ObjectId(projectId),
        Project_Creator: new ObjectId(userId),
        AuthData: AuthData,
        Data: "",
        publicKey: PublicKey,
        privateKey: PrivateKey,
      },
      { session },
    );

    await Projects.updateOne(
      { _id: new ObjectId(projectId) },
      {
        $push: {
          ProjectUsers: { UserId: Insertuser.insertedId, publicKey: PublicKey },
        },
      },
      { session },
    );

    await session.commitTransaction();
    return String(Insertuser.insertedId);
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return 500;
  } finally {
    await session.endSession();
    await client.close();
  }
}

async function DeleteProjectuser(projectId: string, PuserId: string) {
  const client = new MongoClient(`${process.env.MongoUri}`);

  try {
    await client.connect();
  } catch (error) {
    console.error(error);
    return 500;
  }

  const db = client.db("BAAS");
  const Projects = db.collection("projectmodels");
  const ProjectsUser = db.collection("projectusermodels");

  const session = await client.startSession();

  try {
    session.startTransaction();

    await ProjectsUser.deleteOne({ _id: new ObjectId(PuserId) }, { session });

    await Projects.updateOne(
      { _id: new ObjectId(projectId) },
      { $pull: { ProjectUsers: { UserId: new ObjectId(PuserId) } } },
      { session },
    );

    session.commitTransaction();
    return 200;
  } catch (error) {
    console.error(error);
    session.abortTransaction();
    return 500;
  } finally {
    await session.endSession();
    await client.close();
  }
}

export {
  CreateProjectUser,
  ValidatePUserIDService,
  UpdatePUserService,
  DeleteProjectuser,
  ValidateLoginCredService,
};
