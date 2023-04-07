import { Router, Request, Response } from "express";
import {
  SignupResultCode,
  signup,
  login,
  LoginResultCode,
} from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const { signupResultCode: signupResult, newUser } = await signup(req);

  if (signupResult === SignupResultCode.ArleadyExists) {
    return res.status(409).json({ error: "User already exists" });
  }
  if (signupResult === SignupResultCode.InternalError) {
    return res.status(500).json({ error: "Internal server error" });
  }

  res.status(201).json({ message: "User created successfully", user: newUser });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { loginResultCode, token } = await login(req);

  if (loginResultCode === LoginResultCode.NotFound) {
    return res.status(404).json({ error: "User not found" });
  }
  if (loginResultCode === LoginResultCode.InvalidPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({ message: "Login successful", token });
});

export default authRouter;
