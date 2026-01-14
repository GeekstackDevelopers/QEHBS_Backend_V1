import { Request, Response } from "express";
import asynchandler from "express-async-handler";
import { IStudentAuthUseCase } from "../../../usecase/student/auth/interface/IStudentAuthUsecase";

export class StudentAuthController {
  constructor(private studentAuthUseCase: IStudentAuthUseCase) {}

  login = asynchandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log("username", username);
    console.log("password", password);

    const response = await this.studentAuthUseCase.login(username, password);

    res.status(200).json(response);
  });
}
