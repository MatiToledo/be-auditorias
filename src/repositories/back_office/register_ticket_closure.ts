import { Sequelize, WhereOptions } from "sequelize";
import { IRegisterTicketClosureBackOfficeRepository } from "../../interfaces/back_office/register_ticket_closure";
import {
  Branch,
  Company,
  Group,
  RegisterTicket,
  RegisterTicketClosure,
} from "../../models";

export class RegisterTicketClosureBackOfficeRepository
  implements IRegisterTicketClosureBackOfficeRepository
{
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
          "retirement_finish",
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
        ],
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_TICKET_CLOSURES_NOT_FOUND`);
    }
  }
}
