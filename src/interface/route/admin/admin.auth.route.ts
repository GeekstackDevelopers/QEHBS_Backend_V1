import { Router } from "express";
import { adminApiPath } from "../../../shared/constant/constant";
import { AdminAuthController } from "../../controller/admin/admin.auth.controller";
import { AdminAuthUseCase } from "../../../usecase/admin/auth/admin.auth.usecase";
import { IAdminRepo } from "../../../infrastructure/repository/admin/interface/IAdminRepo";
import { IJWTService } from "../../../shared/constant/constant";
import AdminRepo from "../../../infrastructure/repository/admin/admin.repo";
import { JWTService } from "../../../infrastructure/services/jwt.service";


const adminRepo = new AdminRepo()
const jwtService = new JWTService()
const adminAuthUseCase = new AdminAuthUseCase(adminRepo, jwtService)
const adminAuthController = new AdminAuthController(adminAuthUseCase)

const adminAuthRouter = Router()


adminAuthRouter.post(
    adminApiPath.auth.login,
    adminAuthController.login.bind(adminAuthController)
)


export default adminAuthRouter