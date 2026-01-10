import { IAdmin } from "../../../domain/entity/admin";

import { IAdminRepo } from "../../../infrastructure/repository/admin/interface/IAdminRepo";
import { EntityRole, IJWTService, TokenType } from "../../../shared/constant/constant";
import { CustomError } from "../../../shared/constant/customError";

import { IAdminAuthUseCase, ILoginResponse } from "./interface/IAdminAuthUsecase";
export class AdminAuthUseCase implements IAdminAuthUseCase {
    constructor(private adminRepo: IAdminRepo, private jwtService: IJWTService) {}

    async login(email: string, password: string): Promise<ILoginResponse> {
        // const { token, admin } = await this.adminRepo.login(email, password);
        const admin = await this.adminRepo.findByEmail(email);
        if (!admin) {
            throw new CustomError(401, "Invalid email or password");
        }

        if (admin.password !== password) {
            throw new CustomError(401, "Invalid email or password");
        }

        const accessToken = this.jwtService.createToken({ id: admin._id, email: admin.email, role: EntityRole.ADMIN }, TokenType.ADMIN_ACCESS);

        return {
            success: true,
            msg: "Login successful",
            accessToken,
            admin
        };
    }
}