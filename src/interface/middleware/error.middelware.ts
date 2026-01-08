import { NextFunction, Request, Response } from "express";
import { IlearningENV } from "../../config/env.config";
import { CustomError } from "../../shared/constant/customError";
import { HTTPStatusCode } from "../../shared/constant/constant";

export class ErrorHandler {

    static handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
        const stack = IlearningENV.node_env === "production" ? null : err.stack;
        if (err instanceof CustomError) {
             res.status(err.statusCode).json({ success: false, msg: err.message })
             return
        } 

        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message,stack })
    }

    static handleNotFound = (req: Request, res: Response, next: NextFunction): void => {
        res.status(HTTPStatusCode.NOT_FOUND).json({ success: false, msg: "Requested URL is not found", })
    }
}
