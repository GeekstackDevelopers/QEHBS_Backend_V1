import { Router } from "express";
import { adminApiPath } from "../../../shared/constant/constant";
import adminAuthRouter from "./admin.auth.route";
import courseRouter from "./course.routes";
import quizRouter from "./quiz.routes";
import questionRouter from "./question.routes";
import slotsRouter from "./slots.routes";
import adminStudentRouter from "./student.route";
const adminRouter = Router();

adminRouter.use(adminApiPath.auth.base, adminAuthRouter);
adminRouter.use(adminApiPath.course.base, courseRouter);
adminRouter.use(adminApiPath.student.base, adminStudentRouter);
adminRouter.use(adminApiPath.slots.base, slotsRouter);
adminRouter.use(adminApiPath.quiz.base, quizRouter);
adminRouter.use(adminApiPath.question.base, questionRouter);

export default adminRouter;
