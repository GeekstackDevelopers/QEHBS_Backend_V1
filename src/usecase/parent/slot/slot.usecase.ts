import { ISlotRepository } from "../../../infrastructure/repository/slot/interface/ISlotRepo";
import { ISlotsResponse, ISlotUsecase } from "./interface/ISlotUsecase";


export class SlotUsecase implements ISlotUsecase {
    constructor(private slotRepo: ISlotRepository) {}

    async getSlotsByCourseIdAndWeekNumber(courseId: string, weekNumber: number): Promise<ISlotsResponse> {
        const slots = await this.slotRepo.getSlotsByCourseIdAndWeekNumber(courseId, weekNumber);
        return {
            slots,
            msg: "Slots fetched successfully",
            success: true,
        };
    }
}