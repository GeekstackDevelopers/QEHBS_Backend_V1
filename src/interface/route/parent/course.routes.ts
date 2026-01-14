import { Router } from "express";
import { CourseController } from "../../controller/parent/course.controller";
import { CourseUseCase } from "../../../usecase/shared/course/course.usecase";
import { CourseRepository } from "../../../infrastructure/repository/course/course.repo";

const courseRouter = Router();

const courseRepo = new CourseRepository()
const courseUseCase = new CourseUseCase(courseRepo)
const courseController = new CourseController(courseUseCase)


courseRouter.get(
    "/:ageGroup",
    courseController.getCourseByAgeGroup.bind(courseController)
)

export default courseRouter