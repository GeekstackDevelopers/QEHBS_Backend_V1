import { Schema, model } from "mongoose";
import { ICourse, AgeGroup, CourseType } from "../entity/course";

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    generatedId: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
    },

    courseType: {
      type: String,
      required: true,
      enum: Object.values(CourseType), 
    },

    ageGroup: {
      type: String,
      required: true,
      enum: Object.values(AgeGroup),
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isFree: {
      type: Boolean,
      default: false,
    },

    currency: {
      type: String,
      default: "INR",
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModel = model<ICourse>("Course", courseSchema);
