import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const GLOBAL_TOKEN_SECRET = "your_secret_key";

export const checkPassword = async (loginPassword: string, existingPassword: string): Promise<boolean> => {
    return await bcrypt.compare(loginPassword, existingPassword);
}

export const checkToken = async (token: string): Promise<JwtPayload> => {
    return await jwt.verify(token, GLOBAL_TOKEN_SECRET) as JwtPayload;
}

export const encryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const generateToken = async (id: number, email: string): Promise<string> => {
    return jwt.sign(
        { userId: id, email: email },
        process.env.JWT_SECRET || GLOBAL_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
}