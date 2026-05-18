import mongoose, { Schema } from "mongoose";

const ProjectUserSchema = new mongoose.Schema(
  {
    Project_id: {
      type: String,
      required: true,
    },
    Project_Creator: {
      type: Schema.Types.ObjectId,
      ref: "MasterUserModel",
    },
    AuthData: {
      type: Object,
      required: true,
      default: {},
    },
    Data: {
      type: String,
      required: true,
      default: "",
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ProjectUserModel = mongoose.model("ProjectUserModel", ProjectUserSchema);

export { ProjectUserModel };
