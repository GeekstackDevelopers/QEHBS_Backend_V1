import { StudentModel } from "../../../domain/model/student.model";
import { IStudent } from "../../../domain/entity/student";
import { IStudentRepository } from "./interface/IStudentRepo";

export class StudentRepository implements IStudentRepository {
  async createStudent(student: IStudent): Promise<IStudent> {
    const newStudentRepo = await StudentModel.create(student);
    return newStudentRepo;
  }

  async getStudentById(studentId: string): Promise<IStudent | null> {
    const student = await StudentModel.findById(studentId);
    return student;
  }

  async getAllStudents(): Promise<IStudent[]> {
    const student = await StudentModel.find();
    return student;
  }

  async getByEmial(email: string): Promise<IStudent | null> {
    const student = await StudentModel.findOne({ email });
    return student;
  }
  async getStudentByParentId(parentId: string): Promise<IStudent[]> {
    const student = await StudentModel.find({ parent: parentId });
    return student;
  }

  async getStudentByParentIdAndStudentName(
    parentId: string,
    studentName: string
  ): Promise<IStudent | null> {
    const student = await StudentModel.findOne({
      parent: parentId,
      name: studentName,
    });
    return student;
  }

  async getByUsername(username: string): Promise<IStudent | null> {
    const student = await StudentModel.findOne({ username }).select(
      "+password"
    );

    return student;
  }

  async updateStudent(
    studentId: string,
    student: Partial<IStudent>
  ): Promise<IStudent | null> {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      student,
      { new: true }
    );
    return updatedStudent;
  }
}
