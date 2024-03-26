import { UUID } from "crypto";
import { Transaction, WhereOptions } from "sequelize";
import { Branch } from "../../models";
export interface IBranchBackOfficeService {
  bulkCreate(
    data: Partial<Branch>[],
    transaction: Transaction
  ): Promise<Branch[]>;
  getAllByGroupId(GroupId: string): Promise<Branch[]>;
  getAll(queries: QueriesGetAll): Promise<{ rows: AllBranch[]; count: number }>;
}

export interface IBranchBackOfficeRepository {
  bulkCreate(
    data: Partial<Branch>[],
    transaction: Transaction
  ): Promise<Branch[]>;
  getAllByGroupId(GroupId: string): Promise<Branch[]>;
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: Branch[]; count: number }>;
}

export interface AllBranch {
  id: UUID;
  name: string;
  group: string;
  company: string;
  ticketsCant: number;
  barsCant: number;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
  CompanyId?: string;
  GroupId?: string;
}
