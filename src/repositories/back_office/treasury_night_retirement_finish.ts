import { UUID } from "crypto";
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
  async update(
    id: UUID,
    data: Partial<TreasuryNightRetirementFinish>
  ): Promise<TreasuryNightRetirementFinish> {
    try {
      const [updatedInstitution, affectedRows] =
        await TreasuryNightRetirementFinish.update(data, {
          where: { id },
          returning: true,
        });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENT_FINISH_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await TreasuryNightRetirementFinish.destroy({
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
        throw new Error("TREASURY_NIGHT_RETIREMENT_FINISH_NOT_DELETED");
      } else {
        throw new Error("TREASURY_NIGHT_RETIREMENT_FINISH_ERROR_DELETED");
      }
    }
  }
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
          [Sequelize.literal('"RegisterTicket"."id"'), "RegisterTicketId"],
          [Sequelize.literal('"RegisterBar"."id"'), "RegisterBarId"],
          [
            Sequelize.literal('"RegisterTicket->Branch"."id"'),
            "TicketBranchId",
          ],
          [Sequelize.literal('"RegisterBar->Branch"."id"'), "BarBranchId"],
          [
            Sequelize.literal(
              'CASE WHEN "TreasuryNightRetirementFinish"."createdAt" <> "TreasuryNightRetirementFinish"."updatedAt" THEN true ELSE false END'
            ),
            "isEdited",
          ],
        ],
        limit: pagination.limit,
        offset: pagination.offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENTS_FINISH_NOT_FOUND`);
    }
  }
}
