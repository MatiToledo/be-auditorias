import { Transaction } from "sequelize";
import { Group, RegisterBar } from "../../models";

export interface IRegisterBarBackOfficeService {
  bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]>;
}

export interface IRegisterBarBackOfficeRepository {
  bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]>;
}
