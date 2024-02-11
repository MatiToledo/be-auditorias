import { Transaction, WhereOptions } from "sequelize";
import { Group } from "../../models";
import { UUID } from "crypto";

export interface IGroupBackOfficeService {
  bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]>;

  getAll(queries: QueriesGetAll): Promise<{ rows: AllGroup[]; count: number }>;
  getAllByCompanyId(CompanyId: string): Promise<Group[]>;
}

export interface IGroupBackOfficeRepository {
  bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]>;
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: Group[]; count: number }>;
  getAllByCompanyId(CompanyId: string): Promise<Group[]>;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
  CompanyId?: string;
}

export interface AllGroup {
  id: UUID;
  name: string;
  company: string;
  branchesCant: number;
}
