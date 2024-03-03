import { Sequelize, WhereOptions } from "sequelize";
import { ITreasuryNightExpenseBackOfficeRepository } from "../../interfaces/back_office/treasury_night_expense";
import {
  Branch,
  Company,
  Concept,
  Group,
  TreasuryNightExpense,
} from "../../models";

export class TreasuryNightExpenseBackOfficeRepository
  implements ITreasuryNightExpenseBackOfficeRepository
{
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: TreasuryNightExpense[]; count: number }> {
    try {
      return await TreasuryNightExpense.findAndCountAll({
        where,
        distinct: true,
        include: [
          {
            model: Branch,
            attributes: [],
            include: [
              {
                model: Group,
                attributes: [],
                include: [{ model: Company, attributes: [] }],
              },
            ],
          },
          {
            model: Concept,
            attributes: [],
          },
        ],

        attributes: [
          "id",
          "date",
          "description",
          "quantity",
          "unit_price",
          "total",
          [Sequelize.literal('"Concept"."name"'), "concept"],
          [Sequelize.literal('"Branch"."name"'), "branch"],
          [Sequelize.literal('"Branch->Group"."name"'), "group"],
          [Sequelize.literal('"Branch->Group->Company"."name"'), "company"],
        ],
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_EXPENSES_NOT_FOUND`);
    }
  }
}
