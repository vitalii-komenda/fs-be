import { Request } from "express";
import bcrypt from "bcryptjs";
import { User } from "../model";
import { checkPassword, encryptPassword, generateToken } from "../services/token";

enum SignupResultCode {
  ArleadyExists = 0,
  Created = 1,
  InternalError = 2,
}

type SignupResult = {
  signupResultCode: SignupResultCode;
  newUser?: typeof User;
};

const signup = async (req: Request): Promise<SignupResult> => {
  const { User } = req.app.get("models");
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { signupResultCode: SignupResultCode.ArleadyExists };
    }

    const hashedPassword = await encryptPassword(password);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return { signupResultCode: SignupResultCode.Created, newUser };
  } catch (err) {
    console.error(err);
    return { signupResultCode: SignupResultCode.InternalError };
  }
};

enum LoginResultCode {
  NotFound = 0,
  InvalidPassword = 1,
  Authenticated = 2,
  InternalError = 3,
}
type LoginResult = { loginResultCode: LoginResultCode; token?: string };

const login = async (req: Request): Promise<LoginResult> => {
  const { User } = req.app.get("models");

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { loginResultCode: LoginResultCode.NotFound };
    }

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
      return { loginResultCode: LoginResultCode.InvalidPassword };
    }

    const token = await generateToken(user.id, user.email);

    return { loginResultCode: LoginResultCode.Authenticated, token };
  } catch (err) {
    console.error(err);
    return { loginResultCode: LoginResultCode.InternalError };
  }
};

export { signup, login, SignupResultCode, LoginResultCode };
