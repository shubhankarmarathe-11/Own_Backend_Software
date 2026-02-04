import mongoose, { Schema } from "mongoose";

const MasterAuthSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    MobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },

    ProjectId: [{ type: Schema.Types.ObjectId, ref: "ProjectModel" }],
  },
  { timestamps: true },
);

const MasterAuth = mongoose.model("MasterAuth", MasterAuthSchema);

export { MasterAuth };
