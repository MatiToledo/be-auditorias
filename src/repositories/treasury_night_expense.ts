import { UUID } from "crypto";
import { ITreasuryNightExpenseRepository } from "../interfaces/treasury_night_expense";
import { Branch, Concept, TreasuryNightExpense } from "../models";

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

  async getAllByBranchAndDateId(conditions: {
    BranchId: UUID;
    date: Date;
  }): Promise<TreasuryNightExpense[]> {
    try {
      const result = await TreasuryNightExpense.findAll({
        // attributes: ["id", "amount"],
        where: {
          date: conditions.date,
          BranchId: conditions.BranchId,
        },
        include: [{ model: Concept, attributes: ["id", "name"] }],
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_EXPENSES_NOT_FOUND`);
    }
  }
}
