import { Transaction, WhereOptions } from "sequelize";
import { IRegisterTicketBackOfficeRepository } from "../../interfaces/back_office/register_ticket";
import { Branch, Company, Group, RegisterTicket } from "../../models";

export class RegisterTicketBackOfficeRepository
  implements IRegisterTicketBackOfficeRepository
{
  async bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]> {
    try {
      return await RegisterTicket.bulkCreate(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_TICKETS_NOT_CREATED`);
    }
  }
  async create(data: Partial<RegisterTicket>): Promise<RegisterTicket> {
    try {
      return await RegisterTicket.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_TICKET_NOT_CREATED`);
    }
  }
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: RegisterTicket[]; count: number }> {
    try {
      return await RegisterTicket.findAndCountAll({
        where,
        include: [
          {
            model: Branch,
            required: true,
            include: [
              {
                model: Group,
                required: true,
                include: [{ model: Company, required: true }],
              },
            ],
          },
        ],
        distinct: true,
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BARS_NOT_FOUND`);
    }
  }
}
