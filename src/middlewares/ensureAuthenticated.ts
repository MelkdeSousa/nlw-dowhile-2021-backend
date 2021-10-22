import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/environment";

export default (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).json({ error: "invalid token" });

  const [bearer, token] = authToken.split(" ");

  if (!bearer || !token)
    return res.status(401).json({ error: "invalid format token" });

  try {
    const { sub } = verify(token, String(JWT_SECRET)) as { sub: string };

    req.user_id = sub;

    return next();
  } catch (_error) {
    return res.status(401).json({ error: "token expired" });
  }
};
