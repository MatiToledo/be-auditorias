import { UUID } from "crypto";
import { WhereOptions } from "sequelize";
import { RegisterTicket, TreasuryNightRetirementFinish } from "../../models";

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
  type: number;
  date: number;
  expenses: string;
  postnet: number;
  transfers: number;
  amount: string;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
}
