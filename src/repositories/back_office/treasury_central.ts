import { Sequelize, Transaction, WhereOptions } from "sequelize";
import { ITreasuryCentralBackOfficeRepository } from "../../interfaces/back_office/treasury_central";
import { Branch, Company, Concept, Group, TreasuryCentral } from "../../models";
import { UUID } from "crypto";

export class TreasuryCentralBackOfficeRepository
  implements ITreasuryCentralBackOfficeRepository
{
  async update(
    id: UUID,
    data: Partial<TreasuryCentral>
  ): Promise<TreasuryCentral> {
    try {
      const [updatedInstitution, affectedRows] = await TreasuryCentral.update(
        data,
        {
          where: { id },
          returning: true,
        }
      );
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_CENTRAL_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await TreasuryCentral.destroy({
        where: { id },
      });
      if (res > 0) {
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      if (error.message) {
        throw new Error("TREASURY_CENTRAL_NOT_DELETED");
      } else {
        throw new Error("TREASURY_CENTRAL_ERROR_DELETED");
      }
    }
  }
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
        limit: pagination.limit,
        offset: pagination.offset,
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "date",
          "type",
          "payment_method",
          "description",
          "amount",
          [Sequelize.literal('"Concept"."name"'), "concept"],
          [Sequelize.literal('"Concept"."id"'), "ConceptId"],
          [Sequelize.literal('"Branch"."name"'), "branch"],
          [Sequelize.literal('"Branch->Group"."name"'), "group"],
          [Sequelize.literal('"Branch->Group->Company"."name"'), "company"],
          [Sequelize.literal('"Branch"."id"'), "BranchId"],
          [Sequelize.literal('"Branch->Group"."id"'), "GroupId"],
          [Sequelize.literal('"Branch->Group->Company"."id"'), "CompanyId"],
          [
            Sequelize.literal(
              'CASE WHEN "TreasuryCentral"."createdAt" <> "TreasuryCentral"."updatedAt" THEN true ELSE false END'
            ),
            "isEdited",
          ],
        ],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURIES_CENTRAL_NOT_FOUND`);
    }
  }
}
