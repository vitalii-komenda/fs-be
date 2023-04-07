import { NextFunction, Request, Response } from "express";
import { checkToken } from "../services/token";
import { JwtPayload } from "jsonwebtoken";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { User, Todo } = req.app.get("models");
  const token = req.header('x-access-token');

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized Access'
    });
  }

  try {
    const result: JwtPayload = await checkToken(token);
    const user = await User.findOne({ where: { id: result.userId } });
    if (!user) return res.status(401).end();
    req.user = user;

    Todo.addScope(
      "defaultScope",
      {
        where: {
          UserId: result.userId
        },
      },
      { override: true }
    );

    next();
  } catch (e) {
    console.error(e);

    return res.status(401).json({
      message: 'Unauthorized Access'
    });
  }
};

export default authenticate;
