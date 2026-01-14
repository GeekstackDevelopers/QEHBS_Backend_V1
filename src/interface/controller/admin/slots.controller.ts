import { ISlotsUsecase } from "../../../usecase/admin/slots/interface/ISlotsUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export class SlotsController {
    constructor(private slotsUsecase: ISlotsUsecase) {}
    createSlot = asyncHandler(async (req: Request, res: Response) => {
        const file = req.file;
        const response = await this.slotsUsecase.createSlot(req.body, file);
        res.status(201).json(response);
    });
    getSlotsByCourseId = asyncHandler(async (req: Request, res: Response) => {
        const { courseId } = req.params;
        const response = await this.slotsUsecase.getSlotsByCourseId(courseId);
        res.status(200).json(response);
    });
    finAll = asyncHandler(async (req: Request, res: Response) => {
        const response = await this.slotsUsecase.getSlots();
        res.status(200).json(response);
    });
}