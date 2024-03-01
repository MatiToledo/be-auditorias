import { Transaction, WhereOptions } from "sequelize";
import { Group, RegisterTicket, RegisterTicketClosure } from "../../models";
import { UUID } from "crypto";

export interface IRegisterTicketClosureBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllRegisterTicketClosure[]; count: number }>;
}

export interface IRegisterTicketClosureBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: RegisterTicketClosure[]; count: number }>;
}
export interface AllRegisterTicketClosure {
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
