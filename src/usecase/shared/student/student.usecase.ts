import {
  IStudentUsecase,
  IStudentResponse,
  IStudentsResponse,
} from "./interface/IStudentUsecase";
import { IStudentRepository } from "../../../infrastructure/repository/student/interface/IStudentRepo";
import { IStudent } from "../../../domain/entity/student";
import { CustomError } from "../../../shared/constant/customError";
import { uploadMultipleImages } from "../../../interface/middleware/image.upload.middleware";
import { BcryptService } from "../../../infrastructure/services/bcrypt.service";
import { convertStringToObjectId } from "../../../shared/constant/constant";

export class StudentUsecase implements IStudentUsecase {
  constructor(
    private studentRepository: IStudentRepository,
    private bcryptService: BcryptService
  ) {}

  async createStudent(
    student: IStudent,
    files: any
  ): Promise<IStudentResponse> { 
    console.log("file students", files);

    if (files?.profilePhoto?.length) {
      const profilePhoto = await uploadMultipleImages(
        files.profilePhoto,
        "profilePhoto"
      );
      student.profilePhoto = profilePhoto[0];
    }

    if (files?.avatarPhoto?.length) {
      const avatarPhoto = await uploadMultipleImages(
        files.avatarPhoto,
        "avatarPhoto"
      );
      student.avatarPhoto = avatarPhoto[0];
    }

    console.log("new student", student);

    console.log("student", student);

    const hashedPassword = await this.bcryptService.hash(student.password);
    student.password = hashedPassword;

    const createdStudent = await this.studentRepository.createStudent(student);

    return {
      student: createdStudent,
      msg: "Student created successfully",
      success: true,
    };
  }

  async getStudentsByParentId(parentId: string): Promise<IStudentsResponse> {
    const students = await this.studentRepository.getStudentByParentId(
      parentId
    );
    return {
      students,
      msg: "Students fetched successfully",
      success: true,
    };
  }

  async getAllStudents(): Promise<IStudentsResponse> {
    const students = await this.studentRepository.getAllStudents();
    return {
      students,
      msg: "Students fetched successfully",
      success: true,
    };
  }
}
