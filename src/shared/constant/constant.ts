import { JwtPayload } from "jsonwebtoken";

export enum HTTPStatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    GONE = 410,

    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

export enum EntityRole {
  STUDENT = "Student",
  PARENT = "Parent",
  ADMIN = "Admin",
}

export interface IJWTService {
    createToken(jwtPayload: JwtPayload, tokenType: TokenType): string;
    verify(token: string, tokenType: TokenType): JwtPayload;
}


export enum TokenType {
    REFRESH = "Refresh",
    ACCESS = "Access",
    ADMIN_REFRESH = "Admin_Refresh",
    ADMIN_ACCESS = "Admin_Access",
    PARENT_ACCESS = "Parent_Access",
    PARENT_REFRESH = "Parent_Refresh",
}

export interface IApiResponse {
    success: boolean;
    msg: string;
}


export const adminApiPath = Object.freeze({
    base: '/api/admin',
    auth: {
        base: "/auth",
        login: "/login"
    }
})


export const parentApiPath = Object.freeze({
    base: "/api/parent",
    auth: {
        base: "/auth",
        login: "/login",
        signup:"/signup"
    }
})


export const studentApiPath = Object.freeze({
    base: "/api/student",
    auth: {
        base: "/auth",
        login: "/login"
    }
})