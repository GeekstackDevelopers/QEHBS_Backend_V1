import { ICourseUseCase } from "../../../usecase/shared/course/interface/ICourseUsecase";
import { Request, Response } from "express";


export class CourseController {
    constructor(private readonly courseUseCase: ICourseUseCase) { }
    getCourseByAgeGroup = async (req: Request, res: Response) => {
        const { ageGroup } = req.params;
        const response = await this.courseUseCase.findByAgeGroup(ageGroup);
        res.status(200).json(response);
    }
}