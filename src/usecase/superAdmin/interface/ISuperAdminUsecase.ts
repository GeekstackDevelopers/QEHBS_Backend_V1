import { IAdmin } from "../../../domain/entity/admin";
import { IApiResponse } from "../../../shared/constant/constant";
export interface ICreateAdminResponse extends IApiResponse {
    admin: IAdmin | null;
}
export interface ISuperAdminUseCase {
  createAdmin(adminData: IAdmin): Promise<ICreateAdminResponse>;
  
}