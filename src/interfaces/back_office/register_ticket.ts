import { UUID } from "crypto";
import { Transaction, WhereOptions } from "sequelize";
import { RegisterTicket } from "../../models";

export interface IRegisterTicketBackOfficeService {
  bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]>;
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllRegisterTicket[]; count: number }>;
}

export interface IRegisterTicketBackOfficeRepository {
  bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]>;
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: RegisterTicket[]; count: number }>;
}

export interface AllRegisterTicket {
  id: UUID;
  name: string;
  group: string;
  company: string;
  branch: string;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
  CompanyId?: string;
  GroupId?: string;
  BranchId?: string;
}
