import { IQuiz } from "../../../../domain/entity/quiz";
import { IApiResponse } from "../../../../shared/constant/constant";

export interface IQuizResponse extends IApiResponse{
    quiz: IQuiz;
}
export interface IQuizzesReponse extends IApiResponse {
    quizzes: IQuiz[];
}

export interface IQuizUseCase {
    createQuiz(quiz: IQuiz): Promise<IQuizResponse>;
    getQuizzesByCourseId(courseId: string): Promise<IQuizzesReponse>;
    getQuizzesByCourseIdAndWeekNumber(
        courseId: string,
        weekNumber: number
    ): Promise<IQuizzesReponse>;
}