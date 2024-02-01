import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { User } from "../models";

export interface IUserService {
  create(data: Partial<User>, transaction: Transaction): Promise<boolean>;
}

export interface IUserRepository {
  create(data: Partial<User>, transaction: Transaction): Promise<User>;
  findByAuthId(id: UUID): Promise<User>;
}
