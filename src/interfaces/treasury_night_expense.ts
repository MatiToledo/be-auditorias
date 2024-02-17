import { TreasuryNightExpense, TreasuryNightRetirement } from "../models";

export interface ITreasuryNightExpenseService {
  create(body: Partial<TreasuryNightExpense>): Promise<TreasuryNightExpense>;
}

export interface ITreasuryNightExpenseRepository {
  create(data: Partial<TreasuryNightExpense>): Promise<TreasuryNightExpense>;
}
