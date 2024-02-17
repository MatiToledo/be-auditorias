import { UUID } from "crypto";
import { ITreasuryNightRetirementFinishService } from "../interfaces/treasury_night_retirement_finish";
import { TreasuryNightRetirementFinish } from "../models";
import { TreasuryNightRetirementFinishRepository } from "../repositories/treasury_night_retirement_finish";

export class TreasuryNightRetirementFinishService
  implements ITreasuryNightRetirementFinishService
{
  private treasuryNightRetirementFinishRepository =
    new TreasuryNightRetirementFinishRepository();
  async create(
    body: Partial<TreasuryNightRetirementFinish>
  ): Promise<TreasuryNightRetirementFinish> {
    return await this.treasuryNightRetirementFinishRepository.create(body);
  }
  async getAllByBranchAndDateId(conditions: {
    BranchId: UUID;
    date: Date;
  }): Promise<TreasuryNightRetirementFinish[]> {
    return await this.treasuryNightRetirementFinishRepository.getAllByBranchAndDateId(
      conditions
    );
  }
}
