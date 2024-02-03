import { IRegisterTicketClosureService } from "../interfaces/register_ticket_closure";
import { RegisterTicketClosure } from "../models";
import { RegisterTicketClosureRepository } from "../repositories/register_ticket_closure";

export class RegisterTicketClosureService
  implements IRegisterTicketClosureService
{
  private registerTicketClosureRepository =
    new RegisterTicketClosureRepository();
  async create(
    body: Partial<RegisterTicketClosure>
  ): Promise<RegisterTicketClosure> {
    return await this.registerTicketClosureRepository.create(body);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
}
