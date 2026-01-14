import { IStudentUsecase } from "../../../usecase/shared/student/interface/IStudentUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";


export class StudentController {
    constructor(private studentUsecase: IStudentUsecase) { }

    getAllStudents = asyncHandler(async (req: Request, res: Response) => {
        const response = await this.studentUsecase.getAllStudents();
        res.status(200).json(response);
    })
}