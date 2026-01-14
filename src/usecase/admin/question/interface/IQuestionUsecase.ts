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
    deleteQuestion(questionId: string): Promise<IQuestionResponse>
    updateQuestion(questionId: string, question: Partial<IQuestion>): Promise<IQuestionResponse>
    getByQuizId(quizId: string): Promise<IQuestionsResponse>
}