import { Transaction, WhereOptions } from "sequelize";
import { Group, RegisterTicket, TreasuryNightExpense } from "../../models";
import { UUID } from "crypto";

export interface ITreasuryNightExpenseBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllTreasuryNightExpense[]; count: number }>;
}

export interface ITreasuryNightExpenseBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: TreasuryNightExpense[]; count: number }>;
}
export interface AllTreasuryNightExpense {
  id: UUID;
  date: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  register_ticket: string | null;
  register_bar: string | null;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
  CompanyId?: string;
  GroupId?: string;
  BranchId?: string;
  ConceptId?: string;
  startDate?: string;
  endDate?: string;
}
