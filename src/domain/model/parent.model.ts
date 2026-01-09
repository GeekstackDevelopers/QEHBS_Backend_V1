import mongoose, { Schema } from "mongoose";
import { IParent } from "../entity/parent";

const ParentSchema = new Schema<IParent>(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IParent>("Parent", ParentSchema);
