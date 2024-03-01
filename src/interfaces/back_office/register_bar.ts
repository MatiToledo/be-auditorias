import { Transaction, WhereOptions } from "sequelize";
import { Group, RegisterBar } from "../../models";
import { UUID } from "crypto";

export interface IRegisterBarBackOfficeService {
  bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]>;
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllRegisterBar[]; count: number }>;
}

export interface IRegisterBarBackOfficeRepository {
  bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]>;
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: RegisterBar[]; count: number }>;
}
export interface AllRegisterBar {
  id: UUID;
  name: string;
  group: string;
  company: string;
  branch: string;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
  CompanyId?: string;
  GroupId?: string;
  BranchId?: string;
  startDate?: string;
  endDate?: string;
}
