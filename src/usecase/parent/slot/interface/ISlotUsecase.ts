import { ISlots } from "../../../../domain/entity/slot";
import { IApiResponse } from "../../../../shared/constant/constant";

export interface ISlotResponse extends IApiResponse {
    slot: ISlots;
}

export interface ISlotsResponse extends IApiResponse {
  slots: ISlots[];
}

export interface ISlotUsecase {
    getSlotsByCourseIdAndWeekNumber(courseId: string, weekNumber: number): Promise<ISlotsResponse>
}