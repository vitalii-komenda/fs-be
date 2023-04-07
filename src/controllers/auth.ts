import { Request } from "express";
import bcrypt from 'bcryptjs';

enum SignupResultCode {
  ArleadyExists = 0,
  Created = 1,
  InternalError = 2,
}

const signup = async (req: Request): Promise<{signupResult: SignupResultCode, newUser?: typeof User}> => {
  const { User } = req.app.get("models");
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { signupResult: SignupResultCode.ArleadyExists };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ email, password: hashedPassword, name });

    // Send response
    return { signupResult: SignupResultCode.Created, newUser };
  } catch (err) {
    console.error(err);
    return { signupResult: SignupResultCode.InternalError };
  }
};

export {
  signup,
  SignupResultCode as SignupResponse
};
