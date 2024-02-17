import { ITreasuryNightRetirementRepository } from "../interfaces/treasury_night_retirement";
import { TreasuryNightRetirement } from "../models";

export class TreasuryNightRetirementRepository
  implements ITreasuryNightRetirementRepository
{
  async create(
    data: Partial<TreasuryNightRetirement>
  ): Promise<TreasuryNightRetirement> {
    try {
      return await TreasuryNightRetirement.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENT_NOT_CREATED`);
    }
  }
}
