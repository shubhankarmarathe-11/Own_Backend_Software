import mongoose, { Schema } from "mongoose";

const ProjectServicesSchema = new mongoose.Schema({
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: "ProjectModel",
  },

  EmailService: {
    type: Boolean,
    default: false,
  },

  oauth: {
    type: Boolean,
    default: false,
  },

  contentDownloading: {
    type: Boolean,
    default: false,
  },
});

const ProjectSchema = new mongoose.Schema(
  {
    UserID: {
      type: Schema.Types.ObjectId,
      ref: "MasterAuth",
    },

    ProjectName: {
      type: String,
      required: true,
    },

    ProjectServices: {
      type: Schema.Types.ObjectId,
      ref: "ProjectServices",
    },

    ProjectAuth: {
      type: Schema.Types.ObjectId,
      ref: "ProjectAuth",
    },
  },
  { timestamps: true },
);

const ProjectModel = mongoose.model("ProjectModel", ProjectSchema);
const ProjectServicesModel = mongoose.model(
  "ProjectServices",
  ProjectServicesSchema,
);

export { ProjectModel, ProjectServicesModel };
