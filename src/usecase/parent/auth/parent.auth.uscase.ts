import { IParentRepo } from "../../../infrastructure/repository/parent/interface/IParentRepo";
import { EntityRole, IApiResponse, IJWTService, TokenType } from "../../../shared/constant/constant";
import { CustomError } from "../../../shared/constant/customError";
import { IParentAuthUseCase, ParentLoginResponse } from "./interface/IParentAuthUseCase";



export class ParentAuthUseCase implements IParentAuthUseCase {

    constructor(
        private parentRepo: IParentRepo,
        private jwtService: IJWTService
    ) { }


    async login(email: string, password: string): Promise<ParentLoginResponse> {

        const parent = await this.parentRepo.findByEmail(email)
        if (!parent) {
            throw new CustomError(401, "Invalid email or password");
        }

        if (parent.password !== password) {
            throw new CustomError(401, "Invalid email or password");
        }


        const token = this.jwtService.createToken({ id: parent._id, email: parent.email, role: EntityRole.PARENT }, TokenType.PARENT_ACCESS);

        return {
            success: true,
            msg: "Login successful",
            token,
            parent
        };

    }


    async singup(email: string, password: string, name: string, surname: string): Promise<IApiResponse> {

        const existingParent = await this.parentRepo.findByEmail(email)

        if (existingParent) {
            throw new CustomError(400, "Parent with this email already exists")
        }

        const parent = await this.parentRepo.signup({ email, password, name, surname })

        if (!parent) {
            throw new CustomError(500, "Failed to create parent account")
        }

        return {
            success:true,
            msg:"Parent account created successfully"
        }
    }
}