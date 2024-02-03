import { Transaction } from "sequelize";
import { RegisterTicket } from "../models";

export interface IRegisterTicketService {}

export interface IRegisterTicketRepository {
  bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]>;
}
