import { UUID } from "crypto";
import { IRegisterTicketService } from "../interfaces/register_ticket";
import { RegisterTicket } from "../models";
import { RegisterTicketRepository } from "../repositories/register_ticket";

export class RegisterTicketService implements IRegisterTicketService {
  private registerTicketRepository = new RegisterTicketRepository();

  async findByBranchId(BranchId: UUID): Promise<RegisterTicket[]> {
    return await this.registerTicketRepository.findByBranchId(BranchId);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
}
