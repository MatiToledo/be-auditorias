import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { User } from "../models";
import { User_BO } from "../models/back_office/user";
interface TokenData {
  data: Partial<User> | Partial<User_BO>;
  iat: number;
}

export function generateToken(data: Partial<User> | Partial<User_BO>): string {
  try {
    return jwt.sign({ data }, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    throw new Error("TOKEN_NOT_GENERATED");
  }
}

export function decodeToken(token: string): TokenData {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as TokenData;
  } catch (error) {
    console.error(error);
    throw new Error("TOKEN_NOT_DECODED");
  }
}
