import { ITreasuryNightRetirementService } from "../interfaces/treasury_night_retirement";
import { TreasuryNightRetirement } from "../models";
import { TreasuryNightRetirementRepository } from "../repositories/treasury_night_retirement";

export class TreasuryNightRetirementService
  implements ITreasuryNightRetirementService
{
  private treasuryNightRetirementRepository =
    new TreasuryNightRetirementRepository();
  async create(
    body: Partial<TreasuryNightRetirement>
  ): Promise<TreasuryNightRetirement> {
    return await this.treasuryNightRetirementRepository.create(body);
  }
}
