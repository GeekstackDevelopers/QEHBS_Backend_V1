import { IQuestion } from "../../../../domain/entity/question";

export interface IQuestionRepo {
    create(question: IQuestion): Promise<IQuestion>;
    findByCourseId(courseId: string): Promise<IQuestion[]>;
    findByQuizId(quizId: string): Promise<IQuestion[]>
}