import mongoose, { Schema } from "mongoose";

const UserDataInformationSchema = new mongoose.Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: "UserAuthInformation",
  },

  Data: [
    {
      Data: {
        type: String,
        default: "",
      },
    },
  ],
});

const UserDataInformation = mongoose.model(
  "UserDataInformation",
  UserDataInformationSchema
);

export { UserDataInformation };
