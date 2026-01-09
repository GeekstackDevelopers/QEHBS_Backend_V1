import { Router } from "express";
import { ParentAuthController } from "../../controller/parent/parent.auth.controller";
import { parentApiPath } from "../../../shared/constant/constant";
import { ParentAuthUseCase } from "../../../usecase/parent/auth/parent.auth.uscase";
import { ParentRepo } from "../../../infrastructure/repository/parent/parent.repo";
import { JWTService } from "../../../infrastructure/services/jwt.service";



const parentAuthRouter= Router()

const parentRepo = new ParentRepo()

const jwtService = new JWTService()

const parentAuthUseCase = new ParentAuthUseCase(parentRepo, jwtService)
const parentAuthCon = new ParentAuthController(parentAuthUseCase)

parentAuthRouter.post(
    parentApiPath.auth.login,
    parentAuthCon.login.bind(parentAuthCon)
)


export default parentAuthRouter