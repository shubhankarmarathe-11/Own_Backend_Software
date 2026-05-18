import mongoose from "mongoose";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export default async function ConnectMongo() {
  try {
    await mongoose.connect(`${process.env.MongoUri}`, clientOptions);

    await mongoose.connection.db?.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    console.error(error);
  }
}
