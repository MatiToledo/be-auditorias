import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { Company } from "./../models/company";
import { RegisterBar } from "./../models/register_bar";
import { RegisterTicket } from "../models";

export interface ICompanyService {
  create(body: BodyCreateCompany, transaction: Transaction): Promise<void>;
}

export interface ICompanyRepository {
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
