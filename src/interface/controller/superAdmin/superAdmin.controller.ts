import { Request, Response } from "express";
import { ISuperAdminUseCase } from "../../../usecase/superAdmin/interface/ISuperAdminUsecase";

export class SuperAdminController {
  private superAdminUseCase: ISuperAdminUseCase;

  constructor(superAdminUseCase: ISuperAdminUseCase) {
    this.superAdminUseCase = superAdminUseCase;
  }

  createAdmin = async (req: Request, res: Response) => {
    const adminData = req.body;
    const response = await this.superAdminUseCase.createAdmin(adminData);
    res.status(201).json(response);
  };

}
