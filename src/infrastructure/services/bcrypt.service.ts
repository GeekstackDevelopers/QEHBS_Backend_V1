import bcrypt from "bcryptjs";
export interface IBcryptService {
  match(plainPassword: string, hashedPassword: string): Promise<boolean>;
  hash(plainPassword: string): Promise<string>;
}

export class BcryptService implements IBcryptService {
    private salt: number = 10;
    async match(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw error;
        }
    }

    async hash(plainPassword: string): Promise<string> {
        try {
            const hashedPassword = await bcrypt.hash(plainPassword, this.salt);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }
}