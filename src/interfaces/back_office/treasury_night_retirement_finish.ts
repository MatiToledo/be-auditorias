import { UUID } from "crypto";
import { WhereOptions } from "sequelize";
import { TreasuryNightRetirementFinish } from "../../models";

export interface ITreasuryNightRetirementFinishBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllTreasuryNightRetirementFinish[]; count: number }>;
}

export interface ITreasuryNightRetirementFinishBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: TreasuryNightRetirementFinish[]; count: number }>;
}
export interface AllTreasuryNightRetirementFinish {
  id: UUID;
  type: string;
  date: number;
  expenses: number;
  postnet: number;
  transfers: number;
  amount: number;
  register: string;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
}
