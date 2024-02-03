import { Transaction } from "sequelize";
import { RegisterTicketClosure, User } from "../models";
import { IRegisterTicketClosureRepository } from "../interfaces/register_ticket_closure";

export class RegisterTicketClosureRepository
  implements IRegisterTicketClosureRepository
{
  async create(
    data: Partial<RegisterTicketClosure>
  ): Promise<RegisterTicketClosure> {
    try {
      return await RegisterTicketClosure.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BAR_NOT_CREATED`);
    }
  }
}
