import { IQuizUsecase } from "../../../usecase/student/quiz/interface/IQuizUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";


export class StudentQuizController {
    constructor(private readonly quizUsecase: IQuizUsecase) {}
    getSlotCompletedQuizes = asyncHandler(async (req: Request, res: Response) => {
        const studentId = req.params.studentId;
        const response = await this.quizUsecase.getSlotCompletedQuizes(studentId);
        res.status(200).json(response);
    });
}