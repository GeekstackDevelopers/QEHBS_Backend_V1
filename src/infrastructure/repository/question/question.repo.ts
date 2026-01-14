import { IQuestion } from "../../../domain/entity/question";
import { QuestionModel } from "../../../domain/model/quistion.model";
import { IQuestionRepo } from "./interface/IQuestionRepo";

export class QuestionRepo implements IQuestionRepo {
  async create(question: IQuestion): Promise<IQuestion> {
    return await QuestionModel.create(question);
  }

  async update(questionId: string, question: Partial<IQuestion>): Promise<IQuestion | null> {
    return await QuestionModel.findByIdAndUpdate(questionId, question, { new: true });
  }
  async findByCourseId(courseId: string): Promise<IQuestion[]> {
    return await QuestionModel.find({ quizId: courseId });
  }

  async findByQuizId(quizId: string): Promise<IQuestion[]> {
    return await QuestionModel.find({ quizId });
  }
  async deleteQuestion(questionId: string): Promise<IQuestion | null> {
    return await QuestionModel.findByIdAndDelete(questionId);
  }
}
