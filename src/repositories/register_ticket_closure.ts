import { UUID } from "crypto";
import { IRegisterTicketClosureRepository } from "../interfaces/register_ticket_closure";
import { RegisterTicket, RegisterTicketClosure } from "../models";

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
      throw new Error(`REGISTER_TICKET_CLOSURE_NOT_CREATED`);
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
      throw new Error(`REGISTER_TICKET_CLOSURE_NOT_FOUND`);
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
      throw new Error(`REGISTER_TICKET_CLOSURES_NOT_FOUND`);
    }
  }
}
