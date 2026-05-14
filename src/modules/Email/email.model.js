import mongoose, { Schema } from "mongoose";

const EmailSchema = new mongoose.Schema(
  {
    TypeofEmail: {
      type: String,
      required: true,
      default: "UserCreation",
    },
    To: {
      type: String,
      default: "guest",
    },
  },
  { timestamps: true },
);

const EmailModel = mongoose.model("EmailRecord", EmailSchema);

export { EmailModel };
