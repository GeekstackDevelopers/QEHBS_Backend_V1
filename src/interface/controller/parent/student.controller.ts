import { Request, Response } from "express";
import asynchandler from "express-async-handler";
import { IStudentUsecase } from "../../../usecase/shared/student/interface/IStudentUsecase";


export class StudentController {
    constructor(private studentUsecase: IStudentUsecase) { }
    createStudent = asynchandler(async (req: Request, res: Response) => {
        const student = {
            ...req.body,
            parent: req.params.parentId
        };
        const files = req.files;
        const response = await this.studentUsecase.createStudent(student, files);
        res.status(201).json(response);
    })

    getStudents = asynchandler(async (req: Request, res: Response) => {
        console.log("parent id", req.params.parentId);
        const response = await this.studentUsecase.getStudentsByParentId( req.params.parentId);
        res.status(200).json(response);
    })
}