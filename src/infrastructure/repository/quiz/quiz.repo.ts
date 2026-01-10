import QuizModel from "../../../domain/model/quiz.model";
import { IQuiz } from "../../../domain/entity/quiz";
import { IQuizRepository } from "./interface/IQuizRepo";

export class QuizRepository implements IQuizRepository {
    async createQuiz(quiz: IQuiz): Promise<IQuiz> {
        const newQuiz = await QuizModel.create(quiz);
        return newQuiz;
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