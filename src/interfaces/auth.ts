import { Transaction } from "sequelize";
import { Auth, User } from "../models";
export interface IAuthService {
  createUser(data: BodyCreateAuth, transaction: Transaction): Promise<void>;
}

export interface IAuthRepository {
  create(data: Partial<Auth>, transaction: Transaction): Promise<Auth>;
  findIfExistByEmail(email: string): Promise<void>;
}

export interface BodyCreateAuth {
  Auth: Partial<Auth>;
  User: Partial<User>;
}
