import { IQuiz } from "../../../../domain/entity/quiz";

export interface IQuizRepository {
    createQuiz(quiz: IQuiz): Promise<IQuiz>;
    getQuizzesByCourseId(courseId: string): Promise<IQuiz[]>;
    getQuizzesByCourseIdAndWeekNumber(courseId: string, weekNumber: number): Promise<IQuiz[]>;

}