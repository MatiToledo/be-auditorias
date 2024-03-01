import { Transaction, WhereOptions } from "sequelize";
import { Group, RegisterBar, RegisterBarClosure } from "../../models";
import { UUID } from "crypto";

export interface IRegisterBarClosureBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllRegisterBarClosure[]; count: number }>;
}

export interface IRegisterBarClosureBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: RegisterBarClosure[]; count: number }>;
}
export interface AllRegisterBarClosure {
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
  register_bar: string;
  RegisterBar: RegisterBar;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
}
