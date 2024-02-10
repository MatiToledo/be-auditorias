import { Transaction } from "sequelize";
import { IRegisterTicketBackOfficeRepository } from "../../interfaces/back_office/register_ticket";
import { RegisterTicket } from "../../models";

export class RegisterTicketBackOfficeRepository
  implements IRegisterTicketBackOfficeRepository
{
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
