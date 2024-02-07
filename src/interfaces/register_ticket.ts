import { Transaction } from "sequelize";
import { RegisterTicket } from "../models";
import { UUID } from "crypto";

export interface IRegisterTicketService {
  findByBranchId(BranchId: UUID): Promise<RegisterTicket[]>;
}

export interface IRegisterTicketRepository {
  bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]>;
  findByBranchId(BranchId: UUID): Promise<RegisterTicket[]>;
}
