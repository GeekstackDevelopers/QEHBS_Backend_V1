import { IStudent } from "../../../../domain/entity/student";

export interface IStudentRepository {
    createStudent(student: IStudent): Promise<IStudent>;
    getByEmial(email: string): Promise<IStudent | null>;
    getAllStudents(): Promise<IStudent[]>
    getByUsername(username: string): Promise<IStudent | null>;
    getStudentByParentId(parentId: string): Promise<IStudent[]>;
    getStudentByParentIdAndStudentName(parentId: string, studentName: string): Promise<IStudent | null>;
    getStudentById(studentId: string): Promise<IStudent | null>;
    updateStudent(studentId: string, student: Partial<IStudent>): Promise<IStudent | null>;
}