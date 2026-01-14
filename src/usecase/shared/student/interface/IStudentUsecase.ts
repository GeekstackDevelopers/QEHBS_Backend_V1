import { IStudent } from "../../../../domain/entity/student";
import { IApiResponse } from "../../../../shared/constant/constant";


export interface IStudentResponse extends IApiResponse {
    student: IStudent;
}

export interface IStudentsResponse extends IApiResponse {
    students: IStudent[];
}

export interface IStudentUsecase {
    createStudent(student: IStudent, files: any): Promise<IStudentResponse>;
    getStudentsByParentId(parentId: string): Promise<IStudentsResponse>;
    getAllStudents(): Promise<IStudentsResponse>;
    // getStudentByParentId(parentId: string): Promise<IStudentsResponse>;
    // getStudentByParentIdAndStudentName(parentId: string, studentName: string): Promise<IStudent | null>;
    // getStudentById(studentId: string): Promise<IStudent | null>;
    // updateStudent(studentId: string, student: Partial<IStudent>): Promise<IStudent | null>;
}