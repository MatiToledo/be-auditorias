import { NextFunction, Request, Response } from "express";
import parseToken from "parse-bearer-token";
import { decodeToken } from "../libs/jwt";
import { responseHandler } from "../libs/response_handler";
import { User } from "../models";
import { UserBO } from "../models/back_office/user";

export interface AuthenticatedRequest extends Request {
  userData: Partial<User> | Partial<UserBO>;
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
export async function authAdminMiddleware(
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
    if (!["admin", "partner", "auditor"].includes(tokenData.data.role)) {
      throw new Error();
    }
    req.userData = tokenData.data;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json(responseHandler(false, "UNAUTHORIZED"));
  }
}
