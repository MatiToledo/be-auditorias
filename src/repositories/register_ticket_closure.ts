import { Transaction } from "sequelize";
import { RegisterTicket, RegisterTicketClosure, User } from "../models";
import { IRegisterTicketClosureRepository } from "../interfaces/register_ticket_closure";
import { UUID } from "crypto";

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

  async checkIfAlreadyCloseThatDay(
    date: Date,
    RegisterTicketId: UUID
  ): Promise<RegisterTicketClosure> {
    try {
      return await RegisterTicketClosure.findOne({
        where: {
          date,
          RegisterTicketId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_TICKET_CLOSURE_NOT_FIND`);
    }
  }

  async getAllByBranchId(BranchId: UUID): Promise<RegisterTicketClosure[]> {
    try {
      return await RegisterTicketClosure.findAll({
        include: [
          { model: RegisterTicket, where: { BranchId }, required: true },
        ],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_TICKET_CLOSURES_NOT_FIND`);
    }
  }
}
