import { IQuiz } from "../../../../domain/entity/quiz";
import { IApiResponse } from "../../../../shared/constant/constant";

export interface IQuizResponse extends IApiResponse {
    quiz: IQuiz;
}

export interface IQuizzesReponse extends IApiResponse {
    quizzes: IQuiz[]
}


export interface IQuizUsecase {
    getSlotCompletedQuizes(studentId: string): Promise<IQuizzesReponse>
}