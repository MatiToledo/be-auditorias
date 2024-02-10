import { Transaction } from "sequelize";
import { Company, RegisterBar, RegisterTicket } from "../../models";
import { UUID } from "crypto";
export interface ICompanyBackOfficeService {
  getAll(): Promise<Company[]>;
  create(body: BodyCreateCompany, transaction: Transaction): Promise<void>;
}

export interface ICompanyBackOfficeRepository {
  getAll(): Promise<Company[]>;
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
