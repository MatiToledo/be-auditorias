import { Transaction } from "sequelize";
import { Branch } from "../models";

export interface IBranchService {}

export interface IBranchRepository {
  bulkCreate(
    data: Partial<Branch>[],
    transaction: Transaction
  ): Promise<Branch[]>;
}
