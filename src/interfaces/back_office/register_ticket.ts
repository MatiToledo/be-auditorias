import { Transaction } from "sequelize";
import { RegisterTicket } from "../../models";

export interface IRegisterTicketBackOfficeService {
  bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]>;
}

export interface IRegisterTicketBackOfficeRepository {
  bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]>;
}
