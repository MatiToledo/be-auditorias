import { UUID } from "crypto";
import { IRegisterTicketRepository } from "../interfaces/register_ticket";
import { RegisterTicket } from "../models";

export class RegisterTicketRepository implements IRegisterTicketRepository {
  async findByBranchId(BranchId: UUID): Promise<RegisterTicket[]> {
    try {
      return await RegisterTicket.findAll({
        where: {
          BranchId,
        },
        attributes: ["id", "name"],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_TICKETS_NOT_FOUND`);
    }
  }
}
