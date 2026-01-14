import { IStudent } from "../../../../domain/entity/student";
import { IApiResponse } from "../../../../shared/constant/constant";
export interface StudentLoginResponse extends IApiResponse {
    accessToken: string,
    refreshToken: string,
    student: IStudent
}


export interface IStudentAuthUseCase {
    login(username: string, password: string): Promise<StudentLoginResponse>;
}