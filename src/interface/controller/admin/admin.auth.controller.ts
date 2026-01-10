import { Request, Response } from "express";
import asynchandler from "express-async-handler";
import { IAdminAuthUseCase } from "../../../usecase/admin/auth/interface/IAdminAuthUsecase";

export class AdminAuthController {
    private adminAuthUseCase: IAdminAuthUseCase;

    constructor(adminAuthUseCase: IAdminAuthUseCase) {
        this.adminAuthUseCase = adminAuthUseCase;
    }

    login = asynchandler (async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const response = await this.adminAuthUseCase.login(email, password);
        res.status(200).json(response);
    })
}