import { Sequelize, WhereOptions } from "sequelize";
import { ITreasuryCentralBackOfficeRepository } from "../../interfaces/back_office/treasury_central";
import { Branch, Company, Concept, Group, TreasuryCentral } from "../../models";

export class TreasuryCentralBackOfficeRepository
  implements ITreasuryCentralBackOfficeRepository
{
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: TreasuryCentral[]; count: number }> {
    try {
      return await TreasuryCentral.findAndCountAll({
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
          "type",
          "payment_method",
          "description",
          "amount",
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
      throw new Error(`TREASURIES_CENTRAL_NOT_FOUND`);
    }
  }
}
