import { TreasuryNightRetirement } from "../models";

export interface ITreasuryNightRetirementService {
  create(
    body: Partial<TreasuryNightRetirement>
  ): Promise<TreasuryNightRetirement>;
}

export interface ITreasuryNightRetirementRepository {
  create(
    data: Partial<TreasuryNightRetirement>
  ): Promise<TreasuryNightRetirement>;
}
