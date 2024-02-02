import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { decodeToken } from "../libs/jwt";
import { User } from "../models";
import { User_BO } from "../models/back_office/user";
import parseToken from "parse-bearer-token";

export interface AuthenticatedRequest extends Request {
  userData: Partial<User> | Partial<User_BO>;
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = parseToken(req);
    if (!token) {
      throw new Error();
    }
    const tokenData = decodeToken(token);
    req.userData = tokenData.data;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json(responseHandler(false, "UNAUTHORIZED"));
  }
}
