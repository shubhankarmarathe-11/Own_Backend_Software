import mongoose, { Schema } from "mongoose";

const BlacklistedToken = new mongoose.Schema({
  Token: {
    type: String,
    required: true,
  },
});

const BlacklistedTokens = mongoose.model("BlacklistedToken", BlacklistedToken);

export { BlacklistedTokens };
