import { Sequelize, WhereOptions } from "sequelize";
import { ITreasuryNightRetirementBackOfficeRepository } from "../../interfaces/back_office/treasury_night_retirement";
import {
  Branch,
  Company,
  Group,
  RegisterBar,
  RegisterTicket,
} from "../../models";
import { TreasuryNightRetirement } from "./../../models/treasury_night_retirement";

export class TreasuryNightRetirementBackOfficeRepository
  implements ITreasuryNightRetirementBackOfficeRepository
{
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: TreasuryNightRetirement[]; count: number }> {
    try {
      return await TreasuryNightRetirement.findAndCountAll({
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
          "amount",
          [Sequelize.literal('"RegisterTicket"."name"'), "register_ticket"],
          [Sequelize.literal('"RegisterBar"."name"'), "register_bar"],
        ],
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BARS_CLOSURES_NOT_FOUND`);
    }
  }
}
