import mongoose, { Schema } from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    ProjectName: {
      type: String,
      unique: true,
      required: true,
    },

    ProjectPreferences: {
      type: {},
      required: true,
      default: {
        Email: true,
        Password: true,
      },
    },

    ExtraFields: {
      type: {},
      required: true,
      default: {
        Username: false,
        MobileNo: false,
        Address: false,
      },
    },

    ExtraServices: {
      type: {},
      required: true,
      default: {
        MailService: false,
      },
    },

    ProjectData: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProjectData",
      },
    ],
  },
  { timestamps: true }
);

const ProjectData = new mongoose.Schema({
  Projectid: {
    type: Schema.Types.ObjectId,
    ref: "ProjectSchema",
  },
  AuthData: [{}],
});

const ProjectTable = mongoose.model("ProjectSchema", ProjectSchema);
const ProjectDataTable = mongoose.model("ProjectData", ProjectData);

export { ProjectTable, ProjectDataTable };
