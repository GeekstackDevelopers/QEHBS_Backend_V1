import { IQuestionUsecase } from "../../../usecase/admin/question/interface/IQuestionUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export class QuestionController {
    constructor(private questionUsecase: IQuestionUsecase) {}

    getByQuizId = asyncHandler(async (req: Request, res: Response) => {
        const { quizId } = req.params;
        const response = await this.questionUsecase.getByQuizId(quizId);
        res.status(200).json(response);
    });
}