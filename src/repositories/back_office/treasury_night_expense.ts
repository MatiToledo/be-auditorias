import { UUID } from "crypto";
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
  async update(
    id: UUID,
    data: Partial<TreasuryNightExpense>
  ): Promise<TreasuryNightExpense> {
    try {
      const [updatedInstitution, affectedRows] =
        await TreasuryNightExpense.update(data, {
          where: { id },
          returning: true,
        });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_EXPENSE_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await TreasuryNightExpense.destroy({
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
        throw new Error("TREASURY_NIGHT_EXPENSE_NOT_DELETED");
      } else {
        throw new Error("TREASURY_NIGHT_EXPENSE_ERROR_DELETED");
      }
    }
  }
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
          [Sequelize.literal('"Concept"."id"'), "ConceptId"],
          [Sequelize.literal('"Branch"."name"'), "branch"],
          [Sequelize.literal('"Branch->Group"."name"'), "group"],
          [Sequelize.literal('"Branch->Group->Company"."name"'), "company"],
          [Sequelize.literal('"Branch"."id"'), "BranchId"],
          [Sequelize.literal('"Branch->Group"."id"'), "GroupId"],
          [Sequelize.literal('"Branch->Group->Company"."id"'), "CompanyId"],
        ],
        limit: pagination.limit,
        offset: pagination.offset,
        order: [["createdAt", "ASC"]],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_EXPENSES_NOT_FOUND`);
    }
  }
}
