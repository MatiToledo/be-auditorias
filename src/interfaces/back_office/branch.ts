import { Transaction } from "sequelize";
import { Branch, Company } from "../../models";
export interface IBranchBackOfficeService {
  bulkCreate(
    data: Partial<Branch>[],
    transaction: Transaction
  ): Promise<Branch[]>;
  getAllByGroupId(GroupId: string): Promise<Branch[]>;
}

export interface IBranchBackOfficeRepository {
  bulkCreate(
    data: Partial<Branch>[],
    transaction: Transaction
  ): Promise<Branch[]>;
  getAllByGroupId(GroupId: string): Promise<Branch[]>;
}
