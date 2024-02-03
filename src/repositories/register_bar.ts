import { Transaction } from "sequelize";
import { IRegisterBarRepository } from "../interfaces/register_bar";
import { RegisterBar } from "./../models/register_bar";

export class RegisterBarRepository implements IRegisterBarRepository {
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
