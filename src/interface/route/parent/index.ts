import { Router } from "express";
import { parentApiPath } from "../../../shared/constant/constant";
import parentAuthRouter from "./parent.auth.route";
import studentRouter from "./student.routes";
import courseRouter from "./course.routes";
import slotsRouter from "./slot.routes";

const parentRouter= Router()


parentRouter.use(parentApiPath.auth.base,parentAuthRouter);
parentRouter.use(parentApiPath.student.base,studentRouter);
parentRouter.use(parentApiPath.slot.base,slotsRouter);
parentRouter.use(parentApiPath.course.base,courseRouter);


export default parentRouter