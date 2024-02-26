import { ICashRegisterRepository } from "../interfaces/cash_register";
import { CashRegister } from "../models/cash_register";

export class CashRegisterRepository implements ICashRegisterRepository {
  async create(data: Partial<CashRegister>): Promise<CashRegister> {
    try {
      return await CashRegister.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`CASH_REGISTER_NOT_CREATED`);
    }
  }

  async checkIfExistByDayAndBranchId(
    data: Partial<CashRegister>
  ): Promise<CashRegister> {
    try {
      return await CashRegister.findOne({
        where: {
          date: data.date,
          BranchId: data.BranchId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`CASH_REGISTER_NOT_FOUND`);
    }
  }
}
