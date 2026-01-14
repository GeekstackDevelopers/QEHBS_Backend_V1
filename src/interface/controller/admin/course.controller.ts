import { ICourseUseCase } from "../../../usecase/shared/course/interface/ICourseUsecase";
import { Request, Response } from "express";
import asynchandler from "express-async-handler";

export class CourseController {
  constructor(private readonly courseUseCase: ICourseUseCase) {}

  getAllCourses = asynchandler(async (req: Request, res: Response) => {
    const response = await this.courseUseCase.getAllCourses();
    res.status(200).json(response);
  });

  createCourse = asynchandler(async (req: Request, res: Response) => {
    const courseCoverImageFile = req.file;

    const response = await this.courseUseCase.createCourse(req.body, courseCoverImageFile);
    res.status(201).json(response);
  });
}
