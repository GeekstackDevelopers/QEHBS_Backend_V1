import { IQuizUseCase } from "../../../usecase/admin/quiz/interface/IQuizUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export class QuizController {
    constructor(private quizUsecase: IQuizUseCase) {}

    createQuiz = asyncHandler(async (req: Request, res: Response) => {
        const response = await this.quizUsecase.createQuiz(req.body);
        res.status(201).json(response);
    });

    getQuizzesByCourseId = asyncHandler(async (req: Request, res: Response) => {
        const { courseId } = req.params;
        const response = await this.quizUsecase.getQuizzesByCourseId(courseId);
        res.status(200).json(response);
    });

    getQuizzesByCourseIdAndWeekNumber = asyncHandler(async (req: Request, res: Response) => {
        const { courseId, weekNumber } = req.params;
        const response = await this.quizUsecase.getQuizzesByCourseIdAndWeekNumber(
            courseId,
            Number(weekNumber)
        );
        res.status(200).json(response);
    });
}