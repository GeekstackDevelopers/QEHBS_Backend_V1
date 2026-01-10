import { Router } from "express";
import { adminApiPath } from "../../../shared/constant/constant";
import { QuizController } from "../../controller/admin/quiz.controller";
import { QuizUseCase } from "../../../usecase/admin/quiz/quiz.usecase";
import { QuizRepository } from "../../../infrastructure/repository/quiz/quiz.repo";


const quizRepo = new QuizRepository();
const quizUsecase = new QuizUseCase(quizRepo);
const quizController = new QuizController(quizUsecase);

const quizRouter = Router();

quizRouter.get(
    "/create",
    quizController.createQuiz.bind(quizController)
)

quizRouter.get(
    "/:courseId",
    quizController.getQuizzesByCourseId.bind(quizController)
)

quizRouter.get(
    "/:courseId/:weekNumber",
    quizController.getQuizzesByCourseIdAndWeekNumber.bind(quizController)
)

export default quizRouter