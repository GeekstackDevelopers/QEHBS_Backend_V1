import { Router } from "express";
import { adminApiPath } from "../../../shared/constant/constant";
import adminAuthRouter from "./admin.auth.route";
import courseRouter from "./course.routes";
import quizRouter from "./quiz.routes";

const adminRouter = Router();

adminRouter.use(adminApiPath.auth.base, adminAuthRouter);
adminRouter.use(adminApiPath.course.base, courseRouter);
adminRouter.use(adminApiPath.quiz.base, quizRouter);

export default adminRouter;
