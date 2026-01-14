import { Types } from "mongoose";

export enum BookingType {
    ONLINE = "Online",
    OFFLINE = "Offline"
}

export enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}

export interface IBooking {
    _id?: string;
    slotId: Types.ObjectId;
    parentId: Types.ObjectId;
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    paymentRequired: boolean;
    paymentId?: string;
    bookingType: BookingType;
    bookingStatus: BookingStatus;
    bookedAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}