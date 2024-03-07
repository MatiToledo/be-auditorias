import { Sequelize, Transaction, WhereOptions } from "sequelize";
import { ITreasuryNightRetirementBackOfficeRepository } from "../../interfaces/back_office/treasury_night_retirement";
import {
  Branch,
  Company,
  Group,
  RegisterBar,
  RegisterTicket,
} from "../../models";
import { TreasuryNightRetirement } from "./../../models/treasury_night_retirement";
import { UUID } from "crypto";

export class TreasuryNightRetirementBackOfficeRepository
  implements ITreasuryNightRetirementBackOfficeRepository
{
  async update(
    id: UUID,
    data: Partial<TreasuryNightRetirement>
  ): Promise<TreasuryNightRetirement> {
    try {
      const [updatedInstitution, affectedRows] =
        await TreasuryNightRetirement.update(data, {
          where: { id },
          returning: true,
        });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENT_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await TreasuryNightRetirement.destroy({
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
        throw new Error("TREASURY_NIGHT_RETIREMENT_NOT_DELETED");
      } else {
        throw new Error("TREASURY_NIGHT_RETIREMENT_ERROR_DELETED");
      }
    }
  }
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
          [Sequelize.literal('"RegisterTicket"."id"'), "RegisterTicketId"],
          [Sequelize.literal('"RegisterBar"."id"'), "RegisterBarId"],
          [
            Sequelize.literal('"RegisterTicket->Branch"."id"'),
            "TicketBranchId",
          ],
          [Sequelize.literal('"RegisterBar->Branch"."id"'), "BarBranchId"],
        ],
        limit: pagination.limit,
        offset: pagination.offset,
        order: [["createdAt", "ASC"]],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_NIGHT_RETIREMENTS_NOT_FOUND`);
    }
  }
}
