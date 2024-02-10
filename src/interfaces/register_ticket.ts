import { Transaction } from "sequelize";
import { RegisterTicket } from "../models";
import { UUID } from "crypto";

export interface IRegisterTicketService {
  findByBranchId(BranchId: UUID): Promise<RegisterTicket[]>;
}

export interface IRegisterTicketRepository {
  findByBranchId(BranchId: UUID): Promise<RegisterTicket[]>;
}
