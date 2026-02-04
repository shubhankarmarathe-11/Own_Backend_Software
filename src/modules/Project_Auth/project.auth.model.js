import mongoose, { Schema } from "mongoose";

const ProjectAuthSchema = new mongoose.Schema({
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: "ProjectModel",
  },

  userAuthdata: [{}],

  user_ProjectData: {
    type: Schema.Types.ObjectId,
    ref: "UserProjetcData",
  },
});

const ProjectAuthModel = mongoose.model("ProjectAuth", ProjectAuthSchema);

export { ProjectAuthModel };
