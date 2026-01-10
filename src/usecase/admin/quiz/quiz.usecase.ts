import { IQuizResponse, IQuizUseCase, IQuizzesReponse } from "./interface/IQuizUsecase";
import { IQuizRepository } from "../../../infrastructure/repository/quiz/interface/IQuizRepo";
import { IQuiz } from "../../../domain/entity/quiz";

export class QuizUseCase implements IQuizUseCase {
    constructor(
        private readonly quizRepository: IQuizRepository
    ) {}

    async createQuiz(quiz: IQuiz): Promise<IQuizResponse> {
        if (quiz.totalQuestions <= 0) {
            throw new Error("Total questions must be greater than 0");
        }

        if (quiz.marksPerQuestion <= 0) {
            throw new Error("Marks per question must be greater than 0");
        }

        if (quiz.durationMinutes <= 0) {
            throw new Error("Duration must be greater than 0 minutes");
        }

        const newQuiz = await this.quizRepository.createQuiz(quiz);

        return {
            quiz: newQuiz,
            msg: "Quiz created successfully",
            success: true,
        }
    }

    async getQuizzesByCourseId(courseId: string): Promise<IQuizzesReponse> {
        if (!courseId) {
            throw new Error("Course ID is required");
        }

        const quizzes = await this.quizRepository.getQuizzesByCourseId(courseId);

        return {
            quizzes,
            msg: "Quizzes fetched successfully",
            success: true,
        }
    }

    async getQuizzesByCourseIdAndWeekNumber(
        courseId: string,
        weekNumber: number
    ): Promise<IQuizzesReponse> {
        if (!courseId) {
            throw new Error("Course ID is required");
        }

        if (weekNumber <= 0) {
            throw new Error("Week number must be greater than 0");
        }

        const quizzes = await this.quizRepository.getQuizzesByCourseIdAndWeekNumber(
            courseId,
            weekNumber
        );

        return {
            quizzes,
            msg: "Quizzes fetched successfully",
            success: true,
        }
    }
}
