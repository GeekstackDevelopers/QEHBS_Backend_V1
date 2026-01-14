import { IQuestionUsecase } from "../../../usecase/admin/question/interface/IQuestionUsecase";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export class QuestionController {
    constructor(private questionUsecase: IQuestionUsecase) {}
    createQuestion = asyncHandler(async (req: Request, res: Response) => {
        const response = await this.questionUsecase.createQuestion(req.body);
        res.status(201).json(response);
    })
    getByCourseId = asyncHandler(async (req: Request, res: Response) => {
        const { courseId } = req.params;
        const response = await this.questionUsecase.getByCourseId(courseId);
        res.status(200).json(response);
    })
    getByQuizId = asyncHandler(async (req: Request, res: Response) => {
        const { quizId } = req.params;
        const response = await this.questionUsecase.getByQuizId(quizId);
        res.status(200).json(response);
    })
    updateQuestion = asyncHandler(async (req: Request, res: Response) => {
        const { questionId } = req.params;
        const response = await this.questionUsecase.updateQuestion(questionId, req.body);
        res.status(200).json(response);
    })
    deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
        const { questionId } = req.params;
        const response = await this.questionUsecase.deleteQuestion(questionId);
        res.status(200).json(response);
    })
}