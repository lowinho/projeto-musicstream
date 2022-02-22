import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import authConfig from "../config/auth";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  
  let jwtPayload;
  
  try {
    jwtPayload = <any>jwt.verify(token, authConfig.secret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  const { id } = jwtPayload;
  const newToken = jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
  res.setHeader("token", newToken);

  next();
};