import mongoose, { Schema } from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    CreatedBy: {
      type: Schema.Types.ObjectId,
      ref: "MasterUserModel",
    },

    ProjectUsers: [
      {
        UserId: {
          type: Schema.Types.ObjectId,
          ref: "MasterUserModel",
        },
        publicKey: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const ProjectModel = mongoose.model("ProjectModel", ProjectSchema);

export { ProjectModel };
