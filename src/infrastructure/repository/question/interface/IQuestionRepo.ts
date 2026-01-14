import { IQuestion } from "../../../../domain/entity/question";

export interface IQuestionRepo {
  create(question: IQuestion): Promise<IQuestion>;
  findByCourseId(courseId: string): Promise<IQuestion[]>;
  update(questionId: string, question: Partial<IQuestion>): Promise<IQuestion | null>
  findByQuizId(quizId: string): Promise<IQuestion[]>;
  deleteQuestion(questionId: string): Promise<IQuestion | null>;
}
