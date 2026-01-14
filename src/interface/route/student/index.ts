import { Router } from "express";
import { studentApiPath } from "../../../shared/constant/constant";
import studentAuthRouter from "./student.auth.route";
import classRoutes from "./classes.routes";
import quizRoutes from "./quiz.routes";
import questionRouter from "./question.routes";
const studentRouter = Router();

studentRouter.use(studentApiPath.auth.base, studentAuthRouter);
studentRouter.use(studentApiPath.question.base, questionRouter);
studentRouter.use(studentApiPath.class.base, classRoutes);
studentRouter.use(studentApiPath.quiz.base, quizRoutes);


export default studentRouter;