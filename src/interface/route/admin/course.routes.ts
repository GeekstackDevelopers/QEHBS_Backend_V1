import { Router } from "express";
import { adminApiPath } from "../../../shared/constant/constant";
import { CourseController } from "../../controller/admin/course.controller";
import { CourseUseCase } from "../../../usecase/shared/course/course.usecase";
import { CourseRepository } from "../../../infrastructure/repository/course/course.repo";
import { courseCoverImageUpload } from "../../middleware/image.upload.middleware";


const courseRepo = new CourseRepository()
const courseUseCase = new CourseUseCase(courseRepo)
const courseController = new CourseController(courseUseCase)

const courseRouter = Router()

courseRouter.get(
    "/",
    courseController.getAllCourses.bind(courseController)
)
courseRouter.post(
    adminApiPath.course.create,
    courseCoverImageUpload,
    courseController.createCourse.bind(courseController)
)


export default courseRouter