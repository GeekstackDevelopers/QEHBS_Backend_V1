
import { Request, Response } from "express";
import asynchandler from "express-async-handler";
import { IParentAuthUseCase } from "../../../usecase/parent/auth/interface/IParentAuthUseCase";


export class ParentAuthController {

    constructor(
        private parentAuthUseCase: IParentAuthUseCase
    ) { }


    login = asynchandler(async (req: Request, res: Response) => {
        const { email, password } = req.body

        const response = await this.parentAuthUseCase.login(email,password)

        res.status(200).json(response)
    })

    singup = asynchandler (async (req: Request , res: Response)=>{

         const {email,password,name,surname} = req.body
         
            const response = await this.parentAuthUseCase.singup(email,password,name,surname)
         res.status(201).json(response)
    })


}