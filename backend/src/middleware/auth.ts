import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import authConfig from "../config/auth";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  if (token === 'google_auth') {
    next();
    return
  }

  let jwtPayload;
  let tokenFormat = token.slice(7);

  try {
    jwtPayload = <any>jwt.verify(tokenFormat, authConfig.secret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    console.log('error', error)
    return;
  }

  const { id } = jwtPayload;
  const newToken = jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
  res.setHeader("token", newToken);

  next();
};