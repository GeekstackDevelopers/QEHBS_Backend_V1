import { IAdmin } from "../../../../domain/entity/admin";
import { IApiResponse } from "../../../../shared/constant/constant";

export interface ILoginResponse extends IApiResponse {
    accessToken: string;
    admin: IAdmin;
}

export interface IAdminAuthUseCase {
    login(email: string, password: string): Promise<ILoginResponse>;
}