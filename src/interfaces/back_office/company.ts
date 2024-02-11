import { Transaction, WhereOptions } from "sequelize";
import { Company, RegisterBar, RegisterTicket } from "../../models";
import { UUID } from "crypto";
export interface ICompanyBackOfficeService {
  getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllCompany[]; count: number }>;
}

export interface ICompanyBackOfficeRepository {
  getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: Company[]; count: number }>;
  create(data: Partial<Company>, transaction: Transaction): Promise<Company>;
}

export interface GroupBodyCreate {
  name: string;
  CompanyId: UUID;
  Branches: {
    name: string;
    RegisterBars: Partial<RegisterBar>[];
    RegisterTickets: Partial<RegisterTicket>[];
  }[];
}

export interface BodyCreateCompany {
  Company: Partial<Company>;
  Groups: GroupBodyCreate[];
}

export interface AllCompany {
  id: UUID;
  name: string;
  groupsCant: number;
  branchesCant: number;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
}
