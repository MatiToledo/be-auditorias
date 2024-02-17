import { UUID } from "crypto";
import { ITreasuryNightRetirementFinishRepository } from "../interfaces/treasury_night_retirement_finish";
import {
  RegisterBar,
  RegisterTicket,
  TreasuryNightRetirementFinish,
} from "../models";
import { Op, Sequelize } from "sequelize";

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

  async getAllByBranchAndDateId(conditions: {
    BranchId: UUID;
    date: Date;
  }): Promise<TreasuryNightRetirementFinish[]> {
    try {
      const result = await TreasuryNightRetirementFinish.findAll({
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
