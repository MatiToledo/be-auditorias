import { Transaction } from "sequelize";
import { RegisterBar } from "../models/register_bar";
import { UUID } from "crypto";

export interface IRegisterBarService {
  findByBranchId(BranchId: UUID): Promise<RegisterBar[]>;
}

export interface IRegisterBarRepository {
  findByBranchId(BranchId: UUID): Promise<RegisterBar[]>;
}
