import { QuizUsecase } from "../../../usecase/student/quiz/quiz.usecase";
import { Router } from "express";
import { SlotRepository } from "../../../infrastructure/repository/slot/slot.repo";
import { BookingRepo } from "../../../infrastructure/repository/booking/booking.repo";
import { StudentQuizController } from "../../controller/student/quiz.controller";
import { authMiddleware } from "../parent/slot.routes";
const slotRepo = new SlotRepository();
const bookingRepo = new BookingRepo();
const quizUsecase = new QuizUsecase(slotRepo, bookingRepo);
const quizController = new StudentQuizController(quizUsecase);


const quizRoutes = Router();

quizRoutes.get(
    "/",
    authMiddleware.isStudentAuth.bind(authMiddleware),
    quizController.getSlotCompletedQuizes.bind(quizController)
);

export default quizRoutes;