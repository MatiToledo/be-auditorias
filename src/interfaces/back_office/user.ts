import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { User_BO } from "../../models/back_office/user";

export interface IUser_BOService {}

export interface IUser_BORepository {
  create(data: Partial<User_BO>, transaction: Transaction): Promise<User_BO>;
  findByAuthId(id: UUID): Promise<User_BO>;
}
