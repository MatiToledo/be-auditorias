import { Transaction } from "sequelize";
import { IRegisterBarBackOfficeRepository } from "../../interfaces/back_office/register_bar";
import { RegisterBar } from "../../models";

export class RegisterBarBackOfficeRepository
  implements IRegisterBarBackOfficeRepository
{
  async bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]> {
    try {
      return await RegisterBar.bulkCreate(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BARS_NOT_CREATED`);
    }
  }
}
