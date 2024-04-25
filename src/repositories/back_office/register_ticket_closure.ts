import { Sequelize, WhereOptions } from "sequelize";
import { IRegisterTicketClosureBackOfficeRepository } from "../../interfaces/back_office/register_ticket_closure";
import {
  Branch,
  Company,
  Group,
  RegisterTicket,
  RegisterTicketClosure,
} from "../../models";
import { Transaction } from "sequelize";
import { UUID } from "crypto";

export class RegisterTicketClosureBackOfficeRepository
  implements IRegisterTicketClosureBackOfficeRepository
{
  async update(
    id: UUID,
    data: Partial<RegisterTicketClosure>
  ): Promise<RegisterTicketClosure> {
    try {
      const [updatedInstitution, affectedRows] =
        await RegisterTicketClosure.update(data, {
          where: { id },
          returning: true,
        });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_TICKET_CLOSURE_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await RegisterTicketClosure.destroy({
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
        throw new Error("REGISTER_TICKET_CLOSURE_NOT_DELETED");
      } else {
        throw new Error("REGISTER_TICKET_CLOSURE_ERROR_DELETED");
      }
    }
  }
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: RegisterTicketClosure[]; count: number }> {
    try {
      return await RegisterTicketClosure.findAndCountAll({
        where,
        distinct: true,
        include: [
          {
            model: RegisterTicket,
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
          "sold_total",
          "ticket_persons",
          "ticket_price",
          "persons_cant_branch",
          "persons_cant_bar",
          "observations",
          "photo",
          [Sequelize.literal('"RegisterTicket"."name"'), "register_ticket"],
          [Sequelize.literal('"RegisterTicket"."id"'), "RegisterTicketId"],
          [Sequelize.literal('"RegisterTicket->Branch"."id"'), "BranchId"],
          [
            Sequelize.literal(
              'CASE WHEN "RegisterTicketClosure"."createdAt" <> "RegisterTicketClosure"."updatedAt" THEN true ELSE false END'
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
      throw new Error(`REGISTER_TICKET_CLOSURES_NOT_FOUND`);
    }
  }
}
