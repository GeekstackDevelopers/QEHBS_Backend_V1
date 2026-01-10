import { IAdmin } from "../../../domain/entity/admin";
import { IAdminRepo } from "./interface/IAdminRepo";
import AdminModel from "../../../domain/model/admin.model";

export default class AdminRepo implements IAdminRepo {
    async createAdmin(adminData: IAdmin): Promise<IAdmin> {
        try {
            const newAdmin = new AdminModel(adminData);
            return await newAdmin.save();
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(email: string): Promise<IAdmin | null> {
        try {
            return await AdminModel.findOne({ email }).exec();
        } catch (error) {
            throw error;
        }
    }
    
    async updatePassword(adminId: string, newPassword: string): Promise<boolean> {
        try {
            const result = await AdminModel.updateOne({ _id: adminId }, { password: newPassword }).exec();
            return result.modifiedCount > 0;
        } catch (error) {
            throw error;
        }
    }
}