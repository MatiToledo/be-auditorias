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
  retirement_total: number;
  retirement_finish: number;
  expenses_total: number;
  expenses_observations: string;
  postnet_total: number;
  transfers_total: number;
  consumptions: string;
  observations: string;
  photo: string;
  register_ticket: string;
  RegisterTicket: RegisterTicket;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
}
