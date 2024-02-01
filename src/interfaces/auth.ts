import { Transaction } from "sequelize";
import { Auth, User } from "../models";
export interface IAuthService {
  create(data: BodyCreate, transaction: Transaction): Promise<void>;
}

export interface IAuthRepository {
  create(data: Partial<Auth>, transaction: Transaction): Promise<Auth>;
  findIfExistByEmail(email: string): Promise<void>;
}

export interface BodyCreate {
  Auth: Partial<Auth>;
  User: Partial<User>;
}
