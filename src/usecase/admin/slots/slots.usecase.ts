import {
  ISlotsUsecase,
  ISlotResponse,
  ISlotsResponse,
} from "./interface/ISlotsUsecase";
import { ISlotRepository } from "../../../infrastructure/repository/slot/interface/ISlotRepo";
import { ISlots } from "../../../domain/entity/slot";
import { CustomError } from "../../../shared/constant/customError";
import { uploadSingleImage } from "../../../interface/middleware/image.upload.middleware";

export class SlotUsecase implements ISlotsUsecase {
  constructor(private slotRepo: ISlotRepository) {}
  async createSlot(slot: ISlots, file?: any): Promise<ISlotResponse> {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const slotDate = new Date(slot.slotDate);
    slotDate.setHours(0, 0, 0, 0);

    if (slotDate < today) {
      throw new CustomError(400,"Slot date cannot be in the past");
    }

    const start = new Date(`1970-01-01T${slot.startTime}:00`);
    const end = new Date(`1970-01-01T${slot.endTime}:00`);

    if (start >= end) {
      throw new CustomError(400,"Start time must be before end time");
    }

    if (slot.bookedSeats && slot.bookedSeats > slot.maxSeats) {
      throw new CustomError(400, "Booked seats cannot exceed max seats");
    }

    const hostConflict = await this.slotRepo.findHostConflict(
      slot.hostName,
      slot.slotDate,
      slot.startTime,
      slot.endTime
    );

    if (hostConflict) {
      throw new CustomError(400,
        `Host ${slot.hostName} already has a slot during this time`
      );
    }

    let imageUrl = "";
    if (file) {
      imageUrl = await uploadSingleImage(file, "courseCoverImage");
    }

    const createdSlot = await this.slotRepo.createSlot({
      ...slot,
      bannerImage: imageUrl,
      bookedSeats: slot.bookedSeats ?? 0,
      priceOverride: slot.priceOverride ?? 0,
      isActive: slot.isActive ?? true,
    });

    return {
      slot: createdSlot,
      msg: "Slot created successfully",
      success: true,
    };
  }
  async getSlots(): Promise<ISlotsResponse> {
    const slots = await this.slotRepo.getSlots();
    return {
      slots,
      msg: "Slots fetched successfully",
      success: true,
    };
  }
  async getSlotsByCourseId(courseId: string): Promise<ISlotsResponse> {
    const slots = await this.slotRepo.getSlotsByCourseId(courseId);
    if (!slots) {
      throw new CustomError(404, "Slots not found");
    }
    return {
      slots,
      msg: "Slots fetched successfully",
      success: true,
    };
  }
}
