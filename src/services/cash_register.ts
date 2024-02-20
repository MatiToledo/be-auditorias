import { ICashRegisterService } from "../interfaces/casg_register";
import {
  TreasuryNightExpense,
  TreasuryNightRetirement,
  TreasuryNightRetirementFinish,
} from "../models";
import { CashRegisterRepository } from "../repositories/cash_register";
import { CashRegister } from "./../models/cash_register";
import { TreasuryNightExpenseService } from "./treasury_night_expense";
import { TreasuryNightRetirementService } from "./treasury_night_retirement";
import { TreasuryNightRetirementFinishService } from "./treasury_night_retirement_finish";

export class CashRegisterService implements ICashRegisterService {
  private cashRegisterRepository = new CashRegisterRepository();
  private TreasuryNightRetirementFinishService =
    new TreasuryNightRetirementFinishService();
  private TreasuryNightRetirementService = new TreasuryNightRetirementService();
  private TreasuryNightExpenseService = new TreasuryNightExpenseService();
  async create(body: Partial<CashRegister>): Promise<CashRegister> {
    const retirements_finish =
      await this.TreasuryNightRetirementFinishService.getAllByBranchAndDateId({
        BranchId: body.BranchId,
        date: body.date,
      });
    const retirements =
      await this.TreasuryNightRetirementService.getAllByBranchAndDateId({
        BranchId: body.BranchId,
        date: body.date,
      });
    const expenses =
      await this.TreasuryNightExpenseService.getAllByBranchAndDateId({
        BranchId: body.BranchId,
        date: body.date,
      });

    const retirements_total = this.getTotalAmountRetirements(retirements);

    const retirements_finish_total =
      this.getTotalAmountRetirementsFinish(retirements_finish);

    const retirements_finish_expenses_total =
      this.getTotalExpensesRetirementsFinish(retirements_finish);

    const treasury_expenses_total = this.getTotalExpenses(expenses);
    const expenses_total =
      treasury_expenses_total + retirements_finish_expenses_total;
    const cash_total =
      retirements_total +
      retirements_finish_total +
      retirements_finish_expenses_total;
    const amount_theoretical = cash_total + expenses_total;
    const difference = amount_theoretical - body.amount_actual;

    return await this.cashRegisterRepository.create({
      ...body,
      amount_theoretical,
      retirements_total,
      retirements_finish_total,
      retirements_finish_expenses_total,
      treasury_expenses_total,
      expenses_total,
      cash_total,
      difference,
    });
  }

  async checkIfExistByDayAndBranchId(
    body: Partial<CashRegister>
  ): Promise<boolean> {
    const cash_register =
      await this.cashRegisterRepository.checkIfExistByDayAndBranchId(body);
    if (!cash_register) return false;
    return true;
  }

  private getTotalAmountRetirements(retirements: TreasuryNightRetirement[]) {
    let total = 0;
    for (const retirement of retirements) {
      total += retirement.amount;
    }
    return total;
  }
  private getTotalAmountRetirementsFinish(
    retirements_finish: TreasuryNightRetirementFinish[]
  ) {
    let total = 0;
    for (const retirement_finish of retirements_finish) {
      total += retirement_finish.amount;
    }
    return total;
  }
  private getTotalExpensesRetirementsFinish(
    retirements_finish: TreasuryNightRetirementFinish[]
  ) {
    let total = 0;
    for (const retirement_finish of retirements_finish) {
      total += retirement_finish.expenses;
    }
    return total;
  }
  private getTotalExpenses(expenses: TreasuryNightExpense[]) {
    let total = 0;
    for (const expense of expenses) {
      total += expense.total;
    }
    return total;
  }
}
