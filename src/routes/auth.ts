import { Router, Request, Response } from "express";
import { SignupResponse, signup } from "../controllers/auth";

const signupRouter = Router();

// listTodos
signupRouter.post('/signup', async (req: Request, res: Response) => {
  const {signupResult, newUser} = await signup(req);

  if (signupResult === SignupResponse.ArleadyExists) {
    return res.status(409).json({ error: 'User already exists' });
  }
  if (signupResult === SignupResponse.InternalError) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  res.status(201).json({ message: 'User created successfully', user: newUser });
});


export default signupRouter;
