import { ICashRegisterService } from "../interfaces/casg_register";
import { CashRegisterRepository } from "../repositories/cash_register";
import { CashRegister } from "./../models/cash_register";

export class CashRegisterService implements ICashRegisterService {
  private cashRegisterRepository = new CashRegisterRepository();
  async create(body: Partial<CashRegister>): Promise<CashRegister> {
    return await this.cashRegisterRepository.create({
      ...body,
      difference: body.theoretical_amount - body.actual_amount,
    });
  }
}
