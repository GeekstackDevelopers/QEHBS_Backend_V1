import { Router } from "express";
import { StudentController } from "../../controller/parent/student.controller";
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
const studentRouter = Router();

studentRouter.post(
  "/create",
  authMiddleware.isParentAuth.bind(authMiddleware),
  studentImageAndAvatarUpload,
  studentController.createStudent.bind(studentController)
);
studentRouter.get(
  "/",
  authMiddleware.isParentAuth.bind(authMiddleware),
  studentController.getStudents.bind(studentController)
);

export default studentRouter;
