import { Sequelize, WhereOptions } from "sequelize";
import { IRegisterBarClosureBackOfficeRepository } from "../../interfaces/back_office/register_bar_closure";
import {
  Branch,
  Company,
  Group,
  RegisterBar,
  RegisterBarClosure,
} from "../../models";

export class RegisterBarClosureBackOfficeRepository
  implements IRegisterBarClosureBackOfficeRepository
{
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: RegisterBarClosure[]; count: number }> {
    try {
      return await RegisterBarClosure.findAndCountAll({
        where,
        distinct: true,
        include: [
          {
            model: RegisterBar,
            attributes: [],
            include: [
              {
                model: Branch,
                include: [{ model: Group, include: [{ model: Company }] }],
              },
            ],
          },
        ],
        attributes: [
          "id",
          "date",
          "retirement_total",
          "retirement_finish",
          "expenses_total",
          "expenses_observations",
          "postnet_total",
          "transfers_total",
          "consumptions",
          "observations",
          "photo",
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
