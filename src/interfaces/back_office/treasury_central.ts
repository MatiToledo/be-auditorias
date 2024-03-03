import { UUID } from "crypto";
import { WhereOptions } from "sequelize";
import { TreasuryCentral } from "../../models";
import { TreasuryCentralTypeEnum } from "../../models/treasury_central";

export interface ITreasuryCentralBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllTreasuryCentral[]; count: number }>;
}

export interface ITreasuryCentralBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: TreasuryCentral[]; count: number }>;
}
export interface AllTreasuryCentral {
  id: UUID;
  date: Date;
  type: TreasuryCentralTypeEnum;
  payment_method: string;
  concept: string;
  description: string;
  amount: number;
  balance: number;
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
