import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { UserBO } from "../../models/back_office/user";

export interface IUserBOService {}

export interface IUserBORepository {
  create(data: Partial<UserBO>, transaction: Transaction): Promise<UserBO>;
  findByAuthId(id: UUID): Promise<UserBO>;
}
