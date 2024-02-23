import { CashRegister } from "../models/cash_register";

export interface ICashRegisterService {
  create(body: Partial<CashRegister>): Promise<CashRegister>;
  getMovementsByDayAndBranchId(body: Partial<CashRegister>): Promise<any>;
}

export interface ICashRegisterRepository {
  create(data: Partial<CashRegister>): Promise<CashRegister>;
}
