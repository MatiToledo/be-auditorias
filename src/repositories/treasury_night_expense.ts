import { ITreasuryNightExpenseRepository } from "../interfaces/treasury_night_expense";
import { TreasuryNightExpense } from "../models";

export class TreasuryNightExpenseRepository
  implements ITreasuryNightExpenseRepository
{
  async create(
    data: Partial<TreasuryNightExpense>
  ): Promise<TreasuryNightExpense> {
    try {
      return await TreasuryNightExpense.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_EXPENSE_NOT_CREATED`);
    }
  }
}
