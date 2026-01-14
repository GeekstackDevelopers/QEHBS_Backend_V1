import { ISlotUsecase } from "../../../usecase/parent/slot/interface/ISlotUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IBookingUsecase } from "../../../usecase/shared/booking/interface/IBookingUsecase";

export class SlotController {
    constructor(private readonly slotUsecase: ISlotUsecase, private readonly bookingUsecase: IBookingUsecase) {}
    getSlotsByCourseIdAndWeekNumber = asyncHandler(
        async (req: Request, res: Response) => {
            const { courseId, weekNumber } = req.params;
            const slots = await this.slotUsecase.getSlotsByCourseIdAndWeekNumber(
                courseId,
                Number(weekNumber)
            );
            res.status(200).json({ data: slots });
        }
    );

    bookSlot = asyncHandler(async (req: Request, res: Response) => {
        const { slotId, studentId, courseId } = req.body;
        const parentId = req.params.parentId;
        console.log("parent id : ", parentId);
        const response = await this.bookingUsecase.createBooking(slotId, parentId, studentId, courseId)
        res.status(200).json(response);
    });

    confirmSlot = asyncHandler(async (req: Request, res: Response) => {
        const { bookingId } = req.body;
        const response = await this.bookingUsecase.confirmBooking(bookingId);
        res.status(200).json(response);
    })
}