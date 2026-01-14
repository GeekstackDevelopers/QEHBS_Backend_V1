import { Schema, model, Types } from "mongoose";
import { AgeGroup } from "../entity/course";
import { IStudent } from "../entity/student";

const studentSchema = new Schema<IStudent>(
  {
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    nickName: {
      type: String,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    dob: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    avatarPhoto: {
      type: String,
      default: "",
    },

    ageGroup: {
      type: String,
      enum: Object.values(AgeGroup),
      required: true,
    },

    concentOfPublicy: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentModel = model<IStudent>("Student", studentSchema);
