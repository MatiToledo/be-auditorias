import { ITreasuryNightRetirementFinishRepository } from "../interfaces/treasury_night_retirement_finish";
import { TreasuryNightRetirementFinish } from "../models";

export class TreasuryNightRetirementFinishRepository
  implements ITreasuryNightRetirementFinishRepository
{
  async create(
    data: Partial<TreasuryNightRetirementFinish>
  ): Promise<TreasuryNightRetirementFinish> {
    try {
      return await TreasuryNightRetirementFinish.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENT_FINISH_NOT_CREATED`);
    }
  }
}
