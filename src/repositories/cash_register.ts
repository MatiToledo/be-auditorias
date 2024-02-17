import { ICashRegisterRepository } from "../interfaces/casg_register";
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
}
