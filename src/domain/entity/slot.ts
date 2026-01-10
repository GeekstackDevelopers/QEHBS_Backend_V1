import { Types } from "mongoose";

export interface ISlots {
  _id?: string;
  courseId: Types.ObjectId;
  sloteDate: Date;
  maxSeats: number;
  startTime: string;
  isActive: boolean;
  endTime: string;
  bookedSeats: number;
  priceOverride: number;
  hostName: string;
  meetLink: string;
  bannerImage: string;
}
