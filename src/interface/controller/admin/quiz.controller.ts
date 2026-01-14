import { IQuizUseCase } from "../../../usecase/admin/quiz/interface/IQuizUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export class QuizController {
    constructor(private quizUsecase: IQuizUseCase) {}

    createQuiz = asyncHandler(async (req: Request, res: Response) => {
        const file = req.file;
        const response = await this.quizUsecase.createQuiz(req.body, file);
        res.status(201).json(response);
    });

    publishQuiz = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.quizUsecase.publishQuiz(id);
        res.status(200).json(response);
    });

    getQuizById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.quizUsecase.getQuizById(id);
        res.status(200).json(response);
    });

    getAllQuizzes = asyncHandler(async (req: Request, res: Response) => {
        const response = await this.quizUsecase.getAllQuizes();
        res.status(200).json(response);
    })

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