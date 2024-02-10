import { Transaction } from "sequelize";
import { Group } from "../../models";

export interface IGroupBackOfficeService {
  bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]>;

  getAllByCompanyId(CompanyId: string): Promise<Group[]>;
}

export interface IGroupBackOfficeRepository {
  bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]>;
  getAllByCompanyId(CompanyId: string): Promise<Group[]>;
}
