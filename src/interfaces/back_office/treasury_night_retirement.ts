import { Transaction, WhereOptions } from "sequelize";
import { Group, RegisterTicket, TreasuryNightRetirement } from "../../models";
import { UUID } from "crypto";

export interface ITreasuryNightRetirementBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllTreasuryNightRetirement[]; count: number }>;
}

export interface ITreasuryNightRetirementBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: TreasuryNightRetirement[]; count: number }>;
}
export interface AllTreasuryNightRetirement {
  id: UUID;
  type: string;
  date: string;
  amount: number;
  register: string;
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
