import { IAdmin } from "../../domain/entity/admin";
import { IAdminRepo } from "../../infrastructure/repository/admin/interface/IAdminRepo";
import { CustomError } from "../../shared/constant/customError";
import { ICreateAdminResponse, ISuperAdminUseCase } from "./interface/ISuperAdminUsecase";


export class SuperAdminUseCase implements ISuperAdminUseCase {
  constructor(
    private adminRepo: IAdminRepo
  ) {}

  async createAdmin(
    adminData: IAdmin
  ): Promise<ICreateAdminResponse> {
    try {
      const existingAdmin = await this.adminRepo.findByEmail(adminData.email);
      if (existingAdmin) {
        throw new CustomError(400, "Admin with this email already exists");
      }
      const admin = await this.adminRepo.createAdmin(adminData);
      return { 
        msg: "Admin created successfully",
        success: true,
        admin
       };
    } catch (error) {
      throw new CustomError(500, "Failed to create admin");
    }
  }
}
