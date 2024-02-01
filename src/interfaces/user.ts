import { Transaction } from "sequelize";
import { User } from "../models";
import { UUID } from "crypto";

export interface IUserService {
  create(data: Partial<User>, transaction: Transaction): Promise<boolean>;
}

export interface IUserRepository {
  create(data: Partial<User>, transaction: Transaction): Promise<User>;
  findByAuthId(id: UUID): Promise<User>;
}
