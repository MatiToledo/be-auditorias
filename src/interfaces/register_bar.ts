import { Transaction } from "sequelize";
import { RegisterBar } from "../models/register_bar";

export interface IRegisterBarService {}

export interface IRegisterBarRepository {
  bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]>;
}
