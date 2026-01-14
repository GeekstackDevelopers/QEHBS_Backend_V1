import { IStudentRepository } from "../../../infrastructure/repository/student/interface/IStudentRepo";
import { IBcryptService } from "../../../infrastructure/services/bcrypt.service";
import { EntityRole, IJWTService, TokenType } from "../../../shared/constant/constant";
import { CustomError } from "../../../shared/constant/customError";
import { IStudentAuthUseCase, StudentLoginResponse } from "./interface/IStudentAuthUsecase";

export class StudentAuthUseCase implements IStudentAuthUseCase {
  constructor(
    private studentRepo: IStudentRepository,
    private jwtService: IJWTService,
    private bcryptService: IBcryptService
  ) {}

  async login(username: string, password: string): Promise<StudentLoginResponse> {
    console.log(`Login attempt by ${username} pass ${password}`);

    const student = await this.studentRepo.getByUsername(username);
    if (!student) {
      throw new CustomError(401, "Invalid email or password");
    }

    console.log("fetched student", student);

    const passwordMatch = await this.bcryptService.match(password, student.password);
    if (!passwordMatch) {
      throw new CustomError(401, "Invalid email or password");
    }


    const accessToken = this.jwtService.createToken(
      { id: student._id, parentId: student.parent, email: student.email, role: EntityRole.STUDENT },
      TokenType.PARENT_ACCESS
    );

    const refreshToken = this.jwtService.createToken(
      { id: student._id, parentId: student.parent, email: student.email, role: EntityRole.STUDENT },
      TokenType.PARENT_REFRESH
    );

    return {
      success: true,
      msg: "Login successful",
      accessToken,
      refreshToken,
      student,
    };
  }
}