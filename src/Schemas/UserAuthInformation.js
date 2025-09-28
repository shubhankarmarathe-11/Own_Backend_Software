import mongoose, { Schema } from "mongoose";

const UserAuthInformationSchema = new mongoose.Schema(
  {
    ProjectID: {
      type: Schema.Types.ObjectId,
      ref: "ProjectInformation",
    },
    AuthData: {
      _id: { type: Schema.Types.ObjectId, auto: true },
      Email: {
        type: String,
        unique: true,
        required: true,
      },
      Password: {
        type: String,
        required: true,
      },
      Username: {
        type: String,
        default: null,
      },
      MobileNumber: {
        type: String,
        default: null,
      },

      UserDataInfo: {
        type: Schema.Types.ObjectId,
        ref: "UserDataInformation",
      },
    },
  },
  { timestamps: true }
);

const UserAuthInformation = mongoose.model(
  "UserAuthInformation",
  UserAuthInformationSchema
);

export { UserAuthInformation };
