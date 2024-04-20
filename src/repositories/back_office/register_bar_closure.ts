import { UUID } from "crypto";
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
  async update(
    id: UUID,
    data: Partial<RegisterBarClosure>
  ): Promise<RegisterBarClosure> {
    try {
      const [updatedInstitution, affectedRows] =
        await RegisterBarClosure.update(data, {
          where: { id },
          returning: true,
        });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BAR_CLOSURE_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await RegisterBarClosure.destroy({
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
        throw new Error("REGISTER_BAR_CLOSURE_NOT_DELETED");
      } else {
        throw new Error("REGISTER_BAR_CLOSURE_ERROR_DELETED");
      }
    }
  }
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
          "expenses_total",
          "expenses_observations",
          "postnet_total",
          "transfers_total",
          "consumptions",
          "observations",
          "transfers_total_system",
          "cash_total_system",
          "photo",
          [Sequelize.literal('"RegisterBar"."name"'), "register_bar"],
          [Sequelize.literal('"RegisterBar"."id"'), "RegisterBarId"],
          [Sequelize.literal('"RegisterBar->Branch"."id"'), "BranchId"],
        ],
        limit: pagination.limit,
        offset: pagination.offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BARS_CLOSURES_NOT_FOUND`);
    }
  }
}
