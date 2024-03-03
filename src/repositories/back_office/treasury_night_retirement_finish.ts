import { Sequelize, WhereOptions } from "sequelize";
import { ITreasuryNightRetirementFinishBackOfficeRepository } from "../../interfaces/back_office/treasury_night_retirement_finish";
import {
  Branch,
  Company,
  Group,
  RegisterBar,
  RegisterTicket,
  TreasuryNightRetirementFinish,
} from "../../models";

export class TreasuryNightRetirementFinishBackOfficeRepository
  implements ITreasuryNightRetirementFinishBackOfficeRepository
{
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: TreasuryNightRetirementFinish[]; count: number }> {
    try {
      return await TreasuryNightRetirementFinish.findAndCountAll({
        where,
        distinct: true,
        include: [
          {
            model: RegisterBar,
            include: [
              {
                model: Branch,
                include: [{ model: Group, include: [{ model: Company }] }],
              },
            ],
            attributes: [],
          },
          {
            model: RegisterTicket,
            include: [
              {
                model: Branch,
                include: [{ model: Group, include: [{ model: Company }] }],
              },
            ],
            attributes: [],
          },
        ],
        attributes: [
          "id",
          "type",
          "date",
          "expenses",
          "postnet",
          "transfers",
          "amount",
          [Sequelize.literal('"RegisterTicket"."name"'), "register_ticket"],
          [Sequelize.literal('"RegisterBar"."name"'), "register_bar"],
        ],
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENTS_FINISH_NOT_FOUND`);
    }
  }
}
