import { Router } from "express";
import { SuperAdminController } from "../../controller/superAdmin/superAdmin.controller";
import { SuperAdminUseCase } from "../../../usecase/superAdmin/superAdmin.usecase";
import AdminRepo from "../../../infrastructure/repository/admin/admin.repo";
import { superAdminPath } from "../../../shared/constant/constant";


const adminRepo = new AdminRepo()
const superAdminUseCase = new SuperAdminUseCase(adminRepo)
const superAdminController = new SuperAdminController(superAdminUseCase)

const superAdminAdminRouter = Router()

superAdminAdminRouter.post(
    superAdminPath.admin.create,
    superAdminController.createAdmin.bind(superAdminController)
)

export default superAdminAdminRouter