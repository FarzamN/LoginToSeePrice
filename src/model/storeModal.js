import { Schema, model } from "mongoose";

const storeSchema = new Schema(
  {
    storeName: { type: String, require: true },
    is_active: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export default model("store", storeSchema);
