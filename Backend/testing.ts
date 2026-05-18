import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

async function TestTransaction() {
  await client.connect();

  const db = client.db("test");

  const users = db.collection("users");
  const projects = db.collection("projects");

  // create test data
  await users.insertOne({
    name: "shubham",
  });

  await projects.insertOne({
    title: "mern project",
  });

  console.log("before transaction");

  console.log(await users.find().toArray());
  console.log(await projects.find().toArray());

  const session = client.startSession();

  try {
    session.startTransaction();

    // delete user
    await users.deleteOne({ name: "shubham" }, { session });

    console.log("user deleted inside transaction");

    // intentionally create error
    throw new Error("manual failure");

    // never runs
    await projects.deleteMany({}, { session });

    await session.commitTransaction();
  } catch (error) {
    console.log("transaction aborted");

    await session.abortTransaction();
  } finally {
    await session.endSession();
  }

  console.log("after transaction");

  console.log(await users.find().toArray());
  console.log(await projects.find().toArray());

  await client.close();
}

TestTransaction();
