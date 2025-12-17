import mongoose, { Schema } from "mongoose";

const ProjectInformationSchema = new mongoose.Schema(
  {
    ProjectName: {
      type: String,
      unique: true,
      required: true,
    },

    AuthenticationMethods: {
      Email: {
        type: Boolean,
        default: true,
      },
      Username: {
        type: Boolean,
        default: true,
      },
      Mobilenumber: {
        type: Boolean,
        default: true,
      },
    },

    EmailService: {
      type: Boolean,
      default: false,
    },

    UserauthInfo: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserAuthInformation",
      },
    ],
  },
  { timestamps: true }
);

/*
 

Project Information contains --

name and which authentication methods are available for user's.

authentication methods are , the inputs like username,email,password,mobilenumber

Project name
BasicAuth -- Email,Password,Username,MobileNumber

 */

const ProjectInformation = mongoose.model(
  "ProjectInformation",
  ProjectInformationSchema
);

export { ProjectInformation };
