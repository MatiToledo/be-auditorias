import {
  TreasuryCentral,
  TreasuryNightExpense,
  TreasuryNightRetirement,
} from "../models";

export interface ITreasuryCentralService {
  create(body: Partial<TreasuryCentral>): Promise<TreasuryCentral>;
}

export interface ITreasuryCentralRepository {
  create(data: Partial<TreasuryCentral>): Promise<TreasuryCentral>;
}
