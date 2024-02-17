import { ITreasuryNightExpenseService } from "../interfaces/treasury_night_expense";
import { TreasuryNightExpense } from "../models";
import { TreasuryNightExpenseRepository } from "../repositories/treasury_night_expense";

export class TreasuryNightExpenseService
  implements ITreasuryNightExpenseService
{
  private treasuryNightExpenseRepository = new TreasuryNightExpenseRepository();
  async create(
    body: Partial<TreasuryNightExpense>
  ): Promise<TreasuryNightExpense> {
    return await this.treasuryNightExpenseRepository.create({
      ...body,
      total: body.quantity * body.unit_price,
    });
  }
}
