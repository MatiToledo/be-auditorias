import { TreasuryNightRetirementFinish } from "../models";

export interface ITreasuryNightRetirementFinishService {
  create(
    body: Partial<TreasuryNightRetirementFinish>
  ): Promise<TreasuryNightRetirementFinish>;
}

export interface ITreasuryNightRetirementFinishRepository {
  create(
    data: Partial<TreasuryNightRetirementFinish>
  ): Promise<TreasuryNightRetirementFinish>;
}
