import { ISlots } from "../../../../domain/entity/slot";
import { IApiResponse } from "../../../../shared/constant/constant";

export interface ISlotResponse extends IApiResponse {
    slot: ISlots;
}

export interface ISlotsResponse extends IApiResponse {
  slots: ISlots[];
}

export interface ISlotUsecase {
    getSlotAvailabilityById(id: string): Promise<boolean>
    increaseBookedSeats(id: string): Promise<ISlotResponse>
}