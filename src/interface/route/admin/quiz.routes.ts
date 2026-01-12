import { Router } from "express";
import { adminApiPath } from "../../../shared/constant/constant";
import { QuizController } from "../../controller/admin/quiz.controller";
import { QuizUseCase } from "../../../usecase/admin/quiz/quiz.usecase";
import { QuizRepository } from "../../../infrastructure/repository/quiz/quiz.repo";
import { quizThumbnailImageUpload } from "../../middleware/image.upload.middleware";

const quizRepo = new QuizRepository();
const quizUsecase = new QuizUseCase(quizRepo);
const quizController = new QuizController(quizUsecase);

const quizRouter = Router();

quizRouter.post(
  "/",
  quizThumbnailImageUpload,
  quizController.createQuiz.bind(quizController)
);

quizRouter.get(
  "/id/:id",
  quizController.getQuizById.bind(quizController)
);

quizRouter.get(
  "/course/:courseId",
  quizController.getQuizzesByCourseId.bind(quizController)
);

quizRouter.get(
  "/course/:courseId/week/:weekNumber",
  quizController.getQuizzesByCourseIdAndWeekNumber.bind(quizController)
);


export default quizRouter