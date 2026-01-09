import mongoose, { Schema } from "mongoose";
import { IParent } from "../entity/parent";

const ParentSchema = new Schema<IParent>(
  {
    name: { type: String, required: true },
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
      select: false,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IParent>("Parent", ParentSchema);
