import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const authUser = (req: any, res: any, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access Denied");

  try {
    jwt.verify(token, config.auth.token_secret!, (err: any, user: any) => {
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default authUser;
