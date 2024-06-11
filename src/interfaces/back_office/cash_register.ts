import { WhereOptions } from "sequelize";
import { CashRegister } from "../../models/cash_register";
export interface ICashRegisterBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: CashRegister[]; count: number }>;
}

export interface ICashRegisterBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: CashRegister[]; count: number }>;
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
