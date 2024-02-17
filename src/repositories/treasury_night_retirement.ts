import { UUID } from "crypto";
import { Op } from "sequelize";
import { ITreasuryNightRetirementRepository } from "../interfaces/treasury_night_retirement";
import {
  RegisterBar,
  RegisterTicket,
  TreasuryNightRetirement,
} from "../models";

export class TreasuryNightRetirementRepository
  implements ITreasuryNightRetirementRepository
{
  async create(
    data: Partial<TreasuryNightRetirement>
  ): Promise<TreasuryNightRetirement> {
    try {
      console.log("data: ", data);
      console.log("type: ", typeof data.amount);
      return await TreasuryNightRetirement.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENT_NOT_CREATED`);
    }
  }

  async getAllByBranchAndDateId(conditions: {
    BranchId: UUID;
    date: Date;
  }): Promise<TreasuryNightRetirement[]> {
    try {
      const result = await TreasuryNightRetirement.findAll({
        include: [
          {
            model: RegisterBar,
            attributes: [],
          },
          {
            model: RegisterTicket,
            attributes: [],
          },
        ],
        // attributes: ["id", "amount"],
        where: {
          date: conditions.date,
          [Op.or]: [
            { "$RegisterBar.BranchId$": conditions.BranchId },
            { "$RegisterTicket.BranchId$": conditions.BranchId },
          ],
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENT_FINISH_NOT_FOUND`);
    }
  }
}
