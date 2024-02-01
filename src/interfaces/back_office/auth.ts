import { Transaction } from "sequelize";
import { Auth_BO } from "../../models/back_office/auth";
import { User_BO } from "../../models/back_office/user";
export interface IAuth_BOService {
  create(body: BodyCreate, transaction: Transaction): Promise<void>;
  logIn(body: Partial<Auth_BO>): Promise<string>;
}

export interface IAuth_BORepository {
  create(data: Partial<Auth_BO>, transaction: Transaction): Promise<Auth_BO>;
  findIfExistByEmail(email: string): Promise<void>;
  findIfExistByCredentials(data: Partial<Auth_BO>): Promise<Auth_BO>;
}

export interface BodyCreate {
  Auth: Partial<Auth_BO>;
  User: Partial<User_BO>;
}
