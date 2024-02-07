import { Transaction } from "sequelize";
import { IRegisterTicketRepository } from "../interfaces/register_ticket";
import { RegisterBar, RegisterTicket } from "../models";
import { UUID } from "crypto";

export class RegisterTicketRepository implements IRegisterTicketRepository {
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
  async findByBranchId(BranchId: UUID): Promise<RegisterTicket[]> {
    try {
      return await RegisterTicket.findAll({
        where: {
          BranchId,
        },
        attributes: ["id", "name"],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BARS_NOT_FOUND`);
    }
  }
}
