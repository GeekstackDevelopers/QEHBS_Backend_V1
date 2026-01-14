import { ISlots } from "../../../../domain/entity/slot";
import { IApiResponse } from "../../../../shared/constant/constant";

export interface ISlotResponse extends IApiResponse {
  slot: ISlots;
}

export interface ISlotsResponse extends IApiResponse {
  slots: ISlots[];
}

export interface ISlotsUsecase {
  createSlot(slot: ISlots, file: any): Promise<ISlotResponse>;
  getSlotsByCourseId(courseId: string): Promise<ISlotsResponse>;
  getSlots(): Promise<ISlotsResponse>;
}
