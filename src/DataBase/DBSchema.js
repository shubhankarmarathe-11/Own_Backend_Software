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

    UserData: [
      {
        type: Schema.Types.ObjectId,
        ref: "StoreUserData",
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

const StoreUserData = new mongoose.Schema({
  Projectid: {
    type: Schema.Types.ObjectId,
    ref: "ProjectSchema",
  },
  _uid: {
    type: String,
  },
  UserData: [
    {
      Data: {
        type: String,
      },
    },
  ],
});

const ProjectTable = mongoose.model("ProjectSchema", ProjectSchema);
const ProjectDataTable = mongoose.model("ProjectData", ProjectData);
const ProjectDataStore = mongoose.model("StoreUserData", StoreUserData);

export { ProjectTable, ProjectDataTable, ProjectDataStore };
