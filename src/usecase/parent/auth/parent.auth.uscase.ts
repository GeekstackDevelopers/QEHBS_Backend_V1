import { IParentRepo } from "../../../infrastructure/repository/parent/interface/IParentRepo";
import { IBcryptService } from "../../../infrastructure/services/bcrypt.service";
import { EntityRole, IApiResponse, IJWTService, TokenType } from "../../../shared/constant/constant";
import { CustomError } from "../../../shared/constant/customError";
import { IParentAuthUseCase, IParentSignupResponse, ParentLoginResponse } from "./interface/IParentAuthUseCase";



export class ParentAuthUseCase implements IParentAuthUseCase {
  constructor(
    private parentRepo: IParentRepo,
    private jwtService: IJWTService,
    private bcryptService: IBcryptService
  ) {}

  async login(email: string, password: string): Promise<ParentLoginResponse> {
    console.log(`Login attempt by ${email} pass ${password}`);

    const parent = await this.parentRepo.findByEmail(email);
    if (!parent) {
      throw new CustomError(401, "Invalid email or password");
    }

    console.log("parent", parent);
    const passwordMatch = await this.bcryptService.match(password, parent.password);
    if (!passwordMatch) {
      throw new CustomError(401, "Invalid email or password");
    }


    const accessToken = this.jwtService.createToken(
      { id: parent._id, email: parent.email, role: EntityRole.PARENT },
      TokenType.PARENT_ACCESS
    );

    const refreshToken = this.jwtService.createToken(
      { id: parent._id, email: parent.email, role: EntityRole.PARENT },
      TokenType.PARENT_REFRESH
    );

    return {
      success: true,
      msg: "Login successful",
      accessToken,
      refreshToken,
      parent,
    };
  }

  async singup(
    email: string,
    password: string,
    firstName: string,
    surname: string
  ): Promise<IParentSignupResponse> {
    const existingParent = await this.parentRepo.findByEmail(email);

    if (existingParent) {
      throw new CustomError(400, "Parent with this email already exists");
    }

    const hashedPassword = await this.bcryptService.hash(password);
    const parent = await this.parentRepo.signup({
      email,
      password: hashedPassword,
      firstName,
      surname,
    });

    if (!parent) {
      throw new CustomError(500, "Failed to create parent account");
    }

    const accessToken = this.jwtService.createToken(
      { id: parent._id, email: parent.email, role: EntityRole.PARENT },
      TokenType.PARENT_ACCESS
    );
    // const refreshToken = this.jwtService.createToken(
    //   { id: parent._id, email: parent.email, role: EntityRole.PARENT },
    //   TokenType.PARENT_REFRESH
    // );
    return {
      success: true,
      msg: "Parent account created successfully",
      accessToken,
    //   refreshToken,
      parent,
    };
  }
}