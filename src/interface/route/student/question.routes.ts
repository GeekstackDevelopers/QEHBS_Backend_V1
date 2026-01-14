import { questionUsecase } from "../admin/question.routes";
import { QuestionController } from "../../controller/student/question.controller";
import { Router } from "express";

const questionController = new QuestionController(questionUsecase);

const questionRouter = Router();

questionRouter.get(
    "/quiz/:quizId",
    questionController.getByQuizId.bind(questionController)
);

export default questionRouter;