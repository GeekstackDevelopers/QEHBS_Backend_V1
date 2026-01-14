import { ClassesController } from "../../controller/student/classes.controller";
import { Router } from "express";
import { BookingUsecase } from "../../../usecase/shared/booking/booking.usecase";
import { BookingRepo } from "../../../infrastructure/repository/booking/booking.repo";
import { sharedSlotUsecase } from "../parent/slot.routes";
import { courseUseCase } from "../parent/slot.routes";
const bookingRepo = new BookingRepo();
import { authMiddleware } from "../parent/slot.routes";
const bookingUsecase = new BookingUsecase(bookingRepo,sharedSlotUsecase,courseUseCase);

const classController = new ClassesController(bookingUsecase);


const classRoutes = Router();


classRoutes.get("/", authMiddleware.isStudentAuth,classController.getClasses)

export default classRoutes;