import { JwtPayload ,verify, sign,TokenExpiredError} from "jsonwebtoken";
import { IlearningENV } from "../../config/env.config";
import { HTTPStatusCode, IJWTService, TokenType } from "../../shared/constant/constant";
import { CustomError } from "../../shared/constant/customError";


export class JWTService implements IJWTService {

    constructor() { }


    createToken(jwtPayload: JwtPayload, tokenType: TokenType): string {
        try {
            const secret = this.getSecret(tokenType);
            const expiresIn = this.getExpire(tokenType);
            return sign(jwtPayload, secret, {
                expiresIn
            });
        } catch (error) {
            console.error("Failed to generate token:", error);
            throw new CustomError(HTTPStatusCode.INTERNAL_SERVER_ERROR, "Failed to generate token");
        }
    }



    verify(token: string, tokenType: TokenType): JwtPayload {
        try {

            console.log(' comes here ')
            if (!token) {
                throw new CustomError(HTTPStatusCode.UNAUTHORIZED, `No ${tokenType} token provided`);
            }

            if (token.startsWith("Bearer ")) {
                token = token.slice(7).trim();
            }
            const secret = this.getSecret(tokenType);

            return verify(token, secret) as JwtPayload;
        } catch (error: any) {
            console.error("Token verification error:", error);
            if (error instanceof TokenExpiredError) {
                throw new CustomError(
                    HTTPStatusCode.UNAUTHORIZED,
                    `${tokenType} token expired`
                );
            }

            if (error instanceof CustomError) throw error;

            throw new CustomError(
                HTTPStatusCode.FORBIDDEN,
                `Invalid ${tokenType} token`
            );
        }
    }



    private getSecret(tokenType: TokenType) {

        const cfg = (IlearningENV.jwt as any)[tokenType];
        if (!cfg || !cfg.secret) {
            throw new CustomError(HTTPStatusCode.INTERNAL_SERVER_ERROR, `JWT secret not configured for ${tokenType}`);
        }
        return cfg.secret;
    }

    private getExpire(tokenType: TokenType) {
        const cfg = (IlearningENV.jwt as any)[tokenType];
        return cfg && cfg.expire ? cfg.expire : "7d";
    }
}