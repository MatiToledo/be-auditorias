import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { User } from "../models";

export interface IUserService {
  create(data: Partial<User>, transaction: Transaction): Promise<boolean>;
  me(id: UUID): Promise<UserMeType>;
}

export interface IUserRepository {
  me(id: UUID): Promise<User>;
  create(data: Partial<User>, transaction: Transaction): Promise<User>;
  findByAuthId(id: UUID): Promise<User>;
}

export interface UserMeType {
  id: UUID;
  fullName: string;
  email: string;
  role: string;
  photo: string;
  BranchId: UUID;
  branch: string;
  group: string;
  company: string;
}
