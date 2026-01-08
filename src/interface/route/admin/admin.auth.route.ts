import { Router } from "express";
import { adminApiPath } from "../../../shared/constant/constant";
import { AdminAuthController } from "../../controller/admin/admin.auth.controller";


const adminAuthController = new AdminAuthController()
const adminAuthRouter = Router()


adminAuthRouter.post(
    adminApiPath.auth.login,
    adminAuthController.adminLogin.bind(adminAuthController)
)


export default adminAuthRouter