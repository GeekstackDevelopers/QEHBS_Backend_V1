import { Router } from "express";
import { SlotController } from "../../controller/parent/slot.controller";
import { SlotUsecase } from "../../../usecase/parent/slot/slot.usecase";
import { SlotRepository } from "../../../infrastructure/repository/slot/slot.repo";
import { BookingUsecase } from "../../../usecase/shared/booking/booking.usecase";
import { SharedSlotUsecase } from "../../../usecase/shared/slot/slot.usecase";
import { BookingRepo } from "../../../infrastructure/repository/booking/booking.repo";
import { CourseUseCase } from "../../../usecase/shared/course/course.usecase";
import { CourseRepository } from "../../../infrastructure/repository/course/course.repo";
import { JWTService } from "../../../infrastructure/services/jwt.service";
import { Auth } from "../../middleware/auth.middleware";
const jwt = new JWTService();

export const authMiddleware = new Auth(jwt);
const slotsRepo = new SlotRepository();
const slotsUsecase = new SlotUsecase(slotsRepo);
const courseRepo = new CourseRepository();

export const sharedSlotUsecase = new SharedSlotUsecase(slotsRepo);
const bookingRepo = new BookingRepo();

export const courseUseCase = new CourseUseCase(courseRepo);
const bookingUsecase = new BookingUsecase(
  bookingRepo,
  sharedSlotUsecase,
  courseUseCase
);

const slotsController = new SlotController(slotsUsecase, bookingUsecase);

const slotsRouter = Router();

slotsRouter.get(
  "/course/:courseId/week/:weekNumber",
  slotsController.getSlotsByCourseIdAndWeekNumber.bind(slotsController)
);

slotsRouter.post(
  "/book",
  authMiddleware.isParentAuth.bind(authMiddleware),
  slotsController.bookSlot.bind(slotsController)
);

slotsRouter.post(
  "/book/confirm",
  slotsController.confirmSlot.bind(slotsController)
);

export default slotsRouter;
