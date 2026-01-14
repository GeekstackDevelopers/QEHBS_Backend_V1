import QuizModel from "../../../domain/model/quiz.model";
import { IQuiz } from "../../../domain/entity/quiz";
import { IQuizRepository } from "./interface/IQuizRepo";

export class QuizRepository implements IQuizRepository {
    async createQuiz(quiz: IQuiz): Promise<IQuiz> {
        const newQuiz = await QuizModel.create(quiz);
        return newQuiz;
    }

    async getAllQuizzes(): Promise<IQuiz[]> {
        const quizzes = await QuizModel.find();
        return quizzes;
    }

    async publishQuiz(quizId: string): Promise<IQuiz | null> {
        const updatedQuiz = await QuizModel.findByIdAndUpdate(
            quizId,
            { isPublished: true },
            { new: true }
        );
        return updatedQuiz;
    }

    async getQuizById(quizId: string): Promise<IQuiz | null> {
        const quiz = await QuizModel.findById(quizId);
        return quiz;
    }

    async getQuizzesByCourseId(courseId: string): Promise<IQuiz[]> {
        const quizzes = await QuizModel.find({ courseId });
        return quizzes;
    }

    async getQuizzesByCourseIdAndWeekNumber(courseId: string, weekNumber: number): Promise<IQuiz[]> {
        const quizzes = await QuizModel.find({ courseId, weekNumber });
        return quizzes;
    }
}