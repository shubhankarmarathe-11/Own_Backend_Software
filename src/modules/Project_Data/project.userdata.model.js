import mongoose, { Schema } from "mongoose";

const User_ProjetcData_Schema = new mongoose.Schema({
  ProjectID: {
    type: Schema.Types.ObjectId,
    ref: "ProjectAuth",
  },
  UserID: {
    type: Schema.Types.ObjectId,
    ref: "ProjectAuth",
  },

  user_Data: [
    {
      Data_Id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      data: {
        type: String,
      },
    },
  ],
});

User_ProjetcData_Schema.index({ "user_Data.Data_Id": 1 });

const UserProjectData = mongoose.model(
  "UserProjetcData",
  User_ProjetcData_Schema,
);

export { UserProjectData };
