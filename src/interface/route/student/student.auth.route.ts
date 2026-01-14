import { Router } from "express";
import { StudentAuthController } from "../../controller/student/student.auth.controller";
import { StudentAuthUseCase } from "../../../usecase/student/auth/student.auth.usecase";
import { StudentRepository } from "../../../infrastructure/repository/student/student.repo";
import { BcryptService } from "../../../infrastructure/services/bcrypt.service";
import { JWTService } from "../../../infrastructure/services/jwt.service";

const studentAuthRouter = Router();

const bcryptService = new BcryptService()
const jwtService = new JWTService()

const studentRepo = new StudentRepository();
const studentAuthUseCase = new StudentAuthUseCase(studentRepo, jwtService, bcryptService);
const studentAuthController = new StudentAuthController(studentAuthUseCase);


studentAuthRouter.post(
    "/login",
    studentAuthController.login.bind(studentAuthController)
)

export default studentAuthRouter;