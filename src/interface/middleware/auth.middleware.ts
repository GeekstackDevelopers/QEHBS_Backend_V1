import { Request, Response, NextFunction } from "express";
import { EntityRole, HTTPStatusCode, IJWTService, TokenType } from "../../shared/constant/constant";
import { CustomError } from "../../shared/constant/customError";
import { JwtPayload } from "jsonwebtoken";

export class Auth {
    private jwt: IJWTService;

    constructor(jwtService: IJWTService) {
        this.jwt = jwtService;
    }

    isStudentAuth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                throw new CustomError(HTTPStatusCode.UNAUTHORIZED, "Unauthorized: No token provided");
            }

            const decoded: JwtPayload = this.jwt.verify(token, TokenType.ACCESS);
            console.log(' the decod ',decoded)
            console.log(" the id : ",decoded.userId)

            if(decoded && decoded.role === EntityRole.STUDENT) {
                req.params.studentId = decoded.id;
                req.params.role = decoded.role;
                req.params.parentId = decoded.parentId;
                return next();
            }
        } catch (error) {
            next(error);
        }
    }

    isAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                throw new CustomError(HTTPStatusCode.UNAUTHORIZED, "Unauthorized: No token provided");
            }
            const decoded: JwtPayload = this.jwt.verify(token, TokenType.ADMIN_ACCESS);

            if(decoded && decoded.role === EntityRole.ADMIN) {
                req.params.adminId = decoded.id;
                req.params.role = decoded.role;
                req.params.warehouseId = decoded.warehouseId;
                return next();
            } else {
                throw new CustomError(HTTPStatusCode.UNAUTHORIZED, "Unauthorized: Invalid token");
            }
        } catch (error) {
            next(error);
        }
    }


     isParentAuth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                throw new CustomError(HTTPStatusCode.UNAUTHORIZED, "Unauthorized: No token provided");
            }
            const decoded: JwtPayload = this.jwt.verify(token, TokenType.PARENT_ACCESS);

            if(decoded && decoded.role === EntityRole.PARENT) {
                console.log(" the id of parent: ",decoded.id)
                req.params.parentId = decoded.id;
                req.params.role = decoded.role;
                return next();
            } else {
                throw new CustomError(HTTPStatusCode.UNAUTHORIZED, "Unauthorized: Invalid token");
            }
        } catch (error) {
            next(error);
        }
    }

    private getToken(req: Request): string | null {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return null;
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") return null;
        return parts[1];
    }

}