import { UUID } from "crypto";
import { WhereOptions } from "sequelize";
import { Concept } from "../../models";

export interface IConceptBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllConcept[]; count: number }>;
}

export interface IConceptBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: Concept[]; count: number }>;
}
export interface AllConcept {
  id: UUID;
  name: string;
  level: number;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
  level?: string;
}
