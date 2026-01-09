import { Router } from "express";
import { parentApiPath } from "../../../shared/constant/constant";
import parentAuthRouter from "./parent.auth.route";



const parentRouter= Router()


parentRouter.use(parentApiPath.auth.base,parentAuthRouter)

export default parentRouter