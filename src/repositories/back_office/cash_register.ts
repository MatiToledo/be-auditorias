import { UUID } from "crypto";
import { Sequelize, Transaction, WhereOptions } from "sequelize";
import { IBranchBackOfficeRepository } from "../../interfaces/back_office/branch";
import {
  Branch,
  Company,
  Group,
  RegisterBar,
  RegisterTicket,
} from "../../models";
import { ICashRegisterBackOfficeRepository } from "../../interfaces/back_office/cash_register";
import { CashRegister } from "../../models/cash_register";

export class CashRegisterBackOfficeRepository
  implements ICashRegisterBackOfficeRepository
{
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ) {
    try {
      console.log("where: ", where);
      return await CashRegister.findAndCountAll({
        where,
        include: [
          {
            model: Branch,
            include: [
              {
                model: Group,
                include: [{ model: Company }],
              },
            ],
          },
        ],

        distinct: true,
        offset: pagination.offset,
        limit: pagination.limit,
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "date",
          "amount_actual",
          "amount_theoretical",
          "retirements_total",
          "retirements_finish_total",
          "retirements_finish_expenses_total",
          "treasury_expenses_total",
          "expenses_total",
          "cash_total",
          "difference",
          "comment",
          [Sequelize.literal('"Branch"."name"'), "branch"],
          [Sequelize.literal('"Branch->Group"."name"'), "group"],
          [Sequelize.literal('"Branch->Group->Company"."name"'), "company"],
          [
            Sequelize.literal(
              'CASE WHEN "CashRegister"."createdAt" <> "CashRegister"."updatedAt" THEN true ELSE false END'
            ),
            "isEdited",
          ],
          "createdAt",
          "updatedAt",
        ],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`CASH_REGISTER_NOT_FOUND`);
    }
  }
}
