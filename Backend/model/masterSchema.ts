import mongoose, { Schema } from "mongoose";

const MasterUserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      unique: true,
      required: true,
    },
    Password: {
      type: String,
      default: "",
    },
    GoogleId: {
      type: String,
      default: "",
    },
    ProfileUrl: {
      type: String,
      default: "",
    },
    Projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProjectModel",
      },
    ],
  },
  { timestamps: true },
);

const MasterUserModel = mongoose.model("MasterUserModel", MasterUserSchema);

export { MasterUserModel };
