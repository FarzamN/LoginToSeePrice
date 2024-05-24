import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export default model("User", userSchema);
