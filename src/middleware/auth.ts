const jsonwebtoken = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const token = <string>req.header("x-auth-token");
  if (!token) {
    res.status(401).json({ error: { msg: "401 Unauthorized, no token" } });
  }
  let jwtPayload;
  try {
    jwtPayload = <any>jsonwebtoken.verify(token, process.env.SECRET);
    res.locals.jwtPayload = jwtPayload;

    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: { msg: "Invalid token" } });
    return;
  }
};
