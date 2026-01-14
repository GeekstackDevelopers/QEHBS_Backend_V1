import { Router } from "express";
import { StudentController } from "../../controller/admin/student.controller";
import { StudentUsecase } from "../../../usecase/shared/student/student.usecase";
import { StudentRepository } from "../../../infrastructure/repository/student/student.repo";
import { BcryptService } from "../../../infrastructure/services/bcrypt.service";
import { studentImageAndAvatarUpload } from "../../middleware/image.upload.middleware";
import { Auth } from "../../middleware/auth.middleware";
import { JWTService } from "../../../infrastructure/services/jwt.service";

const jwt = new JWTService();

const authMiddleware = new Auth(jwt);
const studentRepo = new StudentRepository();
const bcryptService = new BcryptService();
const studentUsecase = new StudentUsecase(studentRepo, bcryptService);
const studentController = new StudentController(studentUsecase);
const adminStudentRouter = Router();


adminStudentRouter.get(
    "/",
    authMiddleware.isAdminAuth.bind(authMiddleware),
    studentController.getAllStudents.bind(studentController)
);

export default adminStudentRouter;