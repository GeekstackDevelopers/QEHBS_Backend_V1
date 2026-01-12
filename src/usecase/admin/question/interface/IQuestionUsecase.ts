import { IQuestion } from "../../../../domain/entity/question";
import { IApiResponse } from "../../../../shared/constant/constant";


export interface IQuestionResponse extends IApiResponse {
    question: IQuestion
}

export interface IQuestionsResponse extends IApiResponse {
    questions: IQuestion[]
}

export interface IQuestionUsecase {
    createQuestion(question: IQuestion): Promise<IQuestionResponse>
    getByCourseId(courseId: string): Promise<IQuestionsResponse>
    getByQuizId(quizId: string): Promise<IQuestionsResponse>
}