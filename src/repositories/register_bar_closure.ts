import { Transaction } from "sequelize";
import { IRegisterBarClosureRepository } from "../interfaces/register_bar_closure";
import { RegisterBarClosure, User } from "../models";

export class RegisterBarClosureRepository
  implements IRegisterBarClosureRepository
{
  async create(data: Partial<RegisterBarClosure>): Promise<RegisterBarClosure> {
    try {
      return await RegisterBarClosure.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BAR_CLOSURE_NOT_CREATED`);
    }
  }
  async checkIfAlreadyCloseThatDay(date: Date): Promise<RegisterBarClosure> {
    try {
      return await RegisterBarClosure.findOne({
        where: {
          date,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BAR_CLOSURE_NOT_FIND`);
    }
  }
}
