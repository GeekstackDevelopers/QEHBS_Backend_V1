import { Router } from "express";
import { QuestionController } from "../../controller/admin/question.controller";
import { QuestionUsecase } from "../../../usecase/admin/question/question.usecase";
import { QuestionRepo } from "../../../infrastructure/repository/question/question.repo";
import { QuizRepository } from "../../../infrastructure/repository/quiz/quiz.repo";

const quizRepo = new QuizRepository();
const questionRepo = new QuestionRepo();
export const questionUsecase = new QuestionUsecase(questionRepo, quizRepo);
const questionController = new QuestionController(questionUsecase);

const questionRouter = Router();

questionRouter.post(
    "/create",
    questionController.createQuestion.bind(questionController)
)
questionRouter.patch(
    "/quiz/:questionId",
    questionController.updateQuestion.bind(questionController)
)
questionRouter.delete(
    "/id/:questionId",
    questionController.deleteQuestion.bind(questionController)
)
questionRouter.get(
    "/quiz/:quizId",
    questionController.getByQuizId.bind(questionController)
)

questionRouter.get(
    "/course/:courseId",
    questionController.getByCourseId.bind(questionController)
)

export default questionRouter;