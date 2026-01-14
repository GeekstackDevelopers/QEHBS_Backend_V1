import { Types } from "mongoose";

export interface ISlots {
  _id?: string;
  courseId: Types.ObjectId;
  weekNumber: number;
  slotDate: Date;
  maxSeats: number;
  startTime: string;
  isActive: boolean;
  quizIds: Types.ObjectId[];
  endTime: string;
  bookedSeats: number;
  priceOverride: number;
  hostName: string;
  meetLink: string;
  bannerImage: string;
}
