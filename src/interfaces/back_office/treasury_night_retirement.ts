import { UUID } from "crypto";
import { WhereOptions } from "sequelize";
import { TreasuryNightRetirement } from "../../models";

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
