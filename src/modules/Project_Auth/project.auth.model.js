import mongoose, { Schema } from "mongoose";

const ProjectAuthSchema = new mongoose.Schema({
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: "ProjectModel",
  },

  userAuthdata: [
    {
      UserID: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      data: {
        type: Object,
        default: {},
      },
    },
  ],

});

ProjectAuthSchema.index({ "userAuthdata.UserID": 1 });

const ProjectAuthModel = mongoose.model("ProjectAuth", ProjectAuthSchema);

export { ProjectAuthModel };
