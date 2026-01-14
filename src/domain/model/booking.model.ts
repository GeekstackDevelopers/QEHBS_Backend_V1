import { Schema, model, Types } from "mongoose";
import { IBooking, BookingStatus, BookingType } from "../entity/booking";

const bookingSchema = new Schema<IBooking>(
  {
    slotId: {
      type: Types.ObjectId,
      ref: "Slot",
      required: true,
      index: true,
    },

    parentId: {
      type: Types.ObjectId,
      ref: "Parent",
      required: true,
      index: true,
    },

    studentId: {
      type: Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    paymentRequired: {
      type: Boolean,
      required: true,
      default: true,
    },

    paymentId: {
      type: String,
      default: null,
    },

    bookingType: {
      type: String,
      enum: Object.values(BookingType),
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING,
    },

    bookedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BookingModel = model<IBooking>("Booking", bookingSchema);

export default BookingModel;