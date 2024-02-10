import { Transaction } from "sequelize";
import { IRegisterBarBackOfficeService } from "../../interfaces/back_office/register_bar";
import { RegisterBarBackOfficeRepository } from "../../repositories/back_office/register_bar";
import { RegisterBar, RegisterTicket } from "../../models";
import { RegisterTicketBackOfficeRepository } from "../../repositories/back_office/register_ticket";

export class RegisterBarBackOfficeService
  implements IRegisterBarBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private registerTicketBackOfficeRepository =
    new RegisterTicketBackOfficeRepository();
  async bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]> {
    return await this.registerTicketBackOfficeRepository.bulkCreate(
      data,
      transaction
    );
  }
}
