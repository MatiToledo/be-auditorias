import { Transaction } from "sequelize";
import { IRegisterBarBackOfficeService } from "../../interfaces/back_office/register_bar";
import { RegisterBarBackOfficeRepository } from "../../repositories/back_office/register_bar";
import { RegisterBar } from "../../models";

export class RegisterBarBackOfficeService
  implements IRegisterBarBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private registerBarBackOfficeRepository =
    new RegisterBarBackOfficeRepository();
  async bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]> {
    return await this.registerBarBackOfficeRepository.bulkCreate(
      data,
      transaction
    );
  }
}
