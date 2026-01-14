import { IQuestion } from "../../../domain/entity/question";
import { IQuestionUsecase, IQuestionResponse, IQuestionsResponse } from "./interface/IQuestionUsecase";
import { CustomError } from "../../../shared/constant/customError";
import { IQuestionRepo } from "../../../infrastructure/repository/question/interface/IQuestionRepo";
import { IQuizRepository } from "../../../infrastructure/repository/quiz/interface/IQuizRepo";

export class QuestionUsecase implements IQuestionUsecase {
    constructor(private readonly questionRepo: IQuestionRepo, private readonly quizRepo: IQuizRepository) {}

    async createQuestion(question: IQuestion): Promise<IQuestionResponse> {
        const quiz = await this.quizRepo.getQuizById(question.quizId.toString());

        if (!quiz) {
            throw new CustomError(404, "quiz not found");
        }
        const createdQuestion = await this.questionRepo.create(question);
        return {
            question: createdQuestion,
            msg: "Question created successfully",
            success: true,
        }
    }

    async getByCourseId(courseId: string): Promise<IQuestionsResponse> {
        const questions = await this.questionRepo.findByCourseId(courseId);
        return {
            questions,
            msg: "Questions fetched successfully",
            success: true,
        }
    }

    async updateQuestion(questionId: string, question: Partial<IQuestion>): Promise<IQuestionResponse> {
        const updatedQuestion = await this.questionRepo.update(questionId, question);

        if (!updatedQuestion) {
            throw new CustomError(404, "Question not found");
        }
        return {
            question: updatedQuestion,
            msg: "Question updated successfully",
            success: true,
        }
    }

    async getByQuizId(quizId: string): Promise<IQuestionsResponse> {
        const questions = await this.questionRepo.findByQuizId(quizId);
        return {
            questions,
            msg: "Questions fetched successfully",
            success: true,
        }
    }

    async deleteQuestion(questionId: string): Promise<IQuestionResponse> {
        const deletedQuestion = await this.questionRepo.deleteQuestion(questionId);

        if (!deletedQuestion) {
            throw new CustomError(404, "Question not found");
        }
        return {
            question: deletedQuestion,
            msg: "Question deleted successfully",
            success: true,
        }
    }
}