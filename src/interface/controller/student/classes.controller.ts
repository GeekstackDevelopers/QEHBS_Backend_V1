import { IBookingUsecase } from "../../../usecase/shared/booking/interface/IBookingUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export class ClassesController {
    constructor(private readonly bookingUsecase: IBookingUsecase) {}
    getClasses = asyncHandler(async (req: Request, res: Response) => {
        const studentId = req.params.studentId;
        const parentId = req.params.parentId;
        const response = await this.bookingUsecase.getStudentBookings(studentId, parentId);
        res.status(200).json(response);
    });
}