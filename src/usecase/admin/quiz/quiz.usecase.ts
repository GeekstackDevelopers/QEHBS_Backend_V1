import {
  IQuizResponse,
  IQuizUseCase,
  IQuizzesReponse,
} from "./interface/IQuizUsecase";
import { IQuizRepository } from "../../../infrastructure/repository/quiz/interface/IQuizRepo";
import { IQuiz } from "../../../domain/entity/quiz";
import { CustomError } from "../../../shared/constant/customError";
import { uploadSingleImage } from "../../../interface/middleware/image.upload.middleware";
import { convertStringToObjectId } from "../../../shared/constant/constant";

export class QuizUseCase implements IQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async createQuiz(quiz: IQuiz, file?: any): Promise<IQuizResponse> {
    if (quiz.totalQuestions <= 0) {
      throw new CustomError(400, "Total questions must be greater than 0");
    }

    if (quiz.marksPerQuestion <= 0) {
      throw new CustomError(400, "Marks per question must be greater than 0");
    }

    if (quiz.durationMinutes <= 0) {
      throw new CustomError(400, "Duration must be greater than 0 minutes");
    }
    let imageUrl = "";
    if (file) {
      imageUrl = await uploadSingleImage(file, "corseCoverImage");
    }

    const newQuiz = await this.quizRepository.createQuiz({
      ...quiz,
      createdByAdminId: convertStringToObjectId("6960d96b163251d0f4a12caf"),
      thumbnailImage: imageUrl,
    });

    return {
      quiz: newQuiz,
      msg: "Quiz created successfully",
      success: true,
    };
  }

  async getQuizById(quizId: string): Promise<IQuizResponse> {
    if (!quizId) {
      throw new CustomError(400,"Quiz ID is required");
    }

    const quiz = await this.quizRepository.getQuizById(quizId);

    if(!quiz){
      throw new CustomError(404,"Quiz not found");
    }
    return {
      quiz,
      msg: "Quiz fetched successfully",
      success: true,
    };
  }

  async getQuizzesByCourseId(courseId: string): Promise<IQuizzesReponse> {
    if (!courseId) {
      throw new Error("Course ID is required");
    }

    const quizzes = await this.quizRepository.getQuizzesByCourseId(courseId);

    return {
      quizzes,
      msg: "Quizzes fetched successfully",
      success: true,
    };
  }

  async getQuizzesByCourseIdAndWeekNumber(
    courseId: string,
    weekNumber: number
  ): Promise<IQuizzesReponse> {
    if (!courseId) {
      throw new Error("Course ID is required");
    }

    if (weekNumber <= 0) {
      throw new Error("Week number must be greater than 0");
    }

    const quizzes = await this.quizRepository.getQuizzesByCourseIdAndWeekNumber(
      courseId,
      weekNumber
    );

    return {
      quizzes,
      msg: "Quizzes fetched successfully",
      success: true,
    };
  }
}
