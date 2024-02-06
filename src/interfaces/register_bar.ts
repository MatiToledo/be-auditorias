import { Transaction } from "sequelize";
import { RegisterBar } from "../models/register_bar";
import { UUID } from "crypto";

export interface IRegisterBarService {
  findByBranchId(BranchId: UUID): Promise<RegisterBar[]>;
}

export interface IRegisterBarRepository {
  bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]>;
  findByBranchId(BranchId: UUID): Promise<RegisterBar[]>;
}
