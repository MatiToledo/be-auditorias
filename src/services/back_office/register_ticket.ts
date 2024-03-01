import { Op, Transaction, WhereOptions } from "sequelize";
import { IRegisterBarBackOfficeService } from "../../interfaces/back_office/register_bar";
import { RegisterBarBackOfficeRepository } from "../../repositories/back_office/register_bar";
import { RegisterBar, RegisterTicket } from "../../models";
import { RegisterTicketBackOfficeRepository } from "../../repositories/back_office/register_ticket";
import {
  AllRegisterTicket,
  IRegisterTicketBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/register_ticket";
import { buildPagination } from "../../libs/buildPagination";

export class RegisterTicketBackOfficeService
  implements IRegisterTicketBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private registerTicketBackOfficeRepository =
    new RegisterTicketBackOfficeRepository();
  async bulkCreate(
    data: Partial<RegisterTicket>[],
    transaction: Transaction
  ): Promise<RegisterTicket[]> {
    return await this.registerTicketBackOfficeRepository.bulkCreate(
      data,
      transaction
    );
  }

  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllRegisterTicket[];
    count: number;
  }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const register_tickets =
      await this.registerTicketBackOfficeRepository.getAll(where, pagination);
    return {
      count: register_tickets.count,
      rows: register_tickets.rows.map((register_bar) => ({
        id: register_bar.id,
        name: register_bar.name,
        branch: register_bar.Branch.name,
        group: register_bar.Branch.Group.name,
        company: register_bar.Branch.Group.Company.name,
      })),
    };
  }

  private buildQueriesFilters(queries: QueriesGetAll) {
    const where = {
      [Op.and]: [],
    };
    for (const query of Object.keys(queries) as []) {
      if (queries[query]) {
        switch (query) {
          case "q":
            where[Op.and].push({
              [Op.or]: [
                { name: { [Op.iLike]: `%${queries.q}%` } },
                { "$Branch.name$": { [Op.iLike]: `%${queries.q}%` } },
                { "$Branch.Group.name$": { [Op.iLike]: `%${queries.q}%` } },
                {
                  "$Branch.Group.Company.name$": {
                    [Op.iLike]: `%${queries.q}%`,
                  },
                },
              ],
            });
            break;
          case "CompanyId":
            where[Op.and].push({
              "$Branch.Group.Company.id$": { [Op.eq]: queries.CompanyId },
            });
            break;
          case "GroupId":
            where[Op.and].push({
              "$Branch.Group.id$": { [Op.eq]: queries.GroupId },
            });
            break;
          case "BranchId":
            where[Op.and].push({
              "$Branch.id$": { [Op.eq]: queries.BranchId },
            });
            break;
          default:
            break;
        }
      }
    }

    return where as WhereOptions;
  }
}
