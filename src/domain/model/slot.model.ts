import { Schema, model, Types } from "mongoose";
import { ISlots } from "../entity/slot";

const slotSchema = new Schema<ISlots>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    weekNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    slotDate: {
      type: Date,
      required: true,
      index: true,
    },

    startTime: {
      type: String,
      required: true, // e.g. "10:00"
    },

    endTime: {
      type: String,
      required: true, // e.g. "11:30"
    },

    maxSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    bookedSeats: {
      type: Number,
      default: 0,
      min: 0,
    },

    quizIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],

    priceOverride: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    hostName: {
      type: String,
      required: true,
      trim: true,
    },

    meetLink: {
      type: String,
      required: true,
      trim: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

slotSchema.index({ courseId: 1, slotDate: 1, startTime: 1 });

export const SlotModel = model<ISlots>("Slot", slotSchema);
