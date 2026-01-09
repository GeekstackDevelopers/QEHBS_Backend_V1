import { Router } from "express";
import { adminApiPath } from "../../../shared/constant/constant";
import adminAuthRouter from "./admin.auth.route";



const adminRouter = Router()


adminRouter.use(adminApiPath.auth.base,adminAuthRouter)



export default adminRouter