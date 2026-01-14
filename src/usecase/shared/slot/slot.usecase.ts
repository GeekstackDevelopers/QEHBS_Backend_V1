import { ISlotRepository } from "../../../infrastructure/repository/slot/interface/ISlotRepo";
import { HTTPStatusCode } from "../../../shared/constant/constant";
import { CustomError } from "../../../shared/constant/customError";
import {
  ISlotResponse,
  ISlotUsecase,
  ISlotsResponse,
} from "./interface/ISlotUsecase";

export class SharedSlotUsecase implements ISlotUsecase {
  constructor(private readonly slotRepository: ISlotRepository) {}

  async getSlotAvailabilityById(id: string): Promise<boolean> {
    const slot = await this.slotRepository.getSlotById(id);

    if (!slot) {
      throw new CustomError(
        HTTPStatusCode.BAD_REQUEST,
        "There is no available slot for this course"
      );
    }
    if (slot?.bookedSeats >= slot?.maxSeats) {
      return false;
    } else {
      return true;
    }
  }

  async increaseBookedSeats(id: string): Promise<ISlotResponse> {
    const slot = await this.slotRepository.getSlotById(id);
    if (!slot) {
      throw new CustomError(
        HTTPStatusCode.BAD_REQUEST,
        "There is no available"
      );
    }

    if (slot?.bookedSeats >= slot?.maxSeats) {
      throw new CustomError(HTTPStatusCode.BAD_REQUEST, "Slot is full");
    }

    const updatedSlot = await this.slotRepository.increaseBookedSeats(
      id,
      slot.bookedSeats + 1
    );

    if (!updatedSlot) {
      throw new CustomError(
        HTTPStatusCode.BAD_REQUEST,
        "There is no available"
      );
    }

    if (!slot) {
      throw new CustomError(
        HTTPStatusCode.BAD_REQUEST,
        "There is no available slot for this course"
      );
    }

    return {
      slot: updatedSlot,
      msg: "Slot updated successfully",
      success: true,
    };
  }
}
