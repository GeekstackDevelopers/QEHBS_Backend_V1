import { IAdmin } from "../../../../domain/entity/admin";

export interface IAdminRepo {
    findByEmail(email: string): Promise<IAdmin | null>;
    createAdmin(adminData: IAdmin): Promise<IAdmin>;
    updatePassword(adminId: string, newPassword: string): Promise<boolean>;
}
