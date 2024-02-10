import { Transaction } from "sequelize";
import { AuthBO } from "../../models/back_office/auth";
import { UserBO } from "../../models/back_office/user";
export interface IAuthBackOfficeService {
  create(body: BodyCreate, transaction: Transaction): Promise<void>;
  logIn(body: Partial<AuthBO>): Promise<string>;
}

export interface IAuthBackOfficeRepository {
  create(data: Partial<AuthBO>, transaction: Transaction): Promise<AuthBO>;
  findIfExistByEmail(email: string): Promise<void>;
  findIfExistByCredentials(data: Partial<AuthBO>): Promise<AuthBO>;
}

export interface BodyCreate {
  Auth: Partial<AuthBO>;
  User: Partial<UserBO>;
}
