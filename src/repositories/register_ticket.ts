import { Transaction } from "sequelize";
import { IRegisterTicketRepository } from "../interfaces/register_ticket";
import { RegisterTicket } from "../models";

export class RegisterTicketRepository implements IRegisterTicketRepository {
  async bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]> {
    try {
      return await RegisterTicket.bulkCreate(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_TICKETS_NOT_CREATED`);
    }
  }
}
