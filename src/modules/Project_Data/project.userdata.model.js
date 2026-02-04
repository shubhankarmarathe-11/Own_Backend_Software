import mongoose, { Schema } from "mongoose";

const User_ProjetcData_Schema = new mongoose.Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: "ProjectAuth",
  },

  user_Data: [{}],
});

const UserProjectData = mongoose.model(
  "UserProjetcData",
  User_ProjetcData_Schema,
);

export { UserProjectData };
