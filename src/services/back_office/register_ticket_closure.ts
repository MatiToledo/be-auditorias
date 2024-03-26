import { UUID } from "crypto";
import { Op, WhereOptions } from "sequelize";
import { QueriesGetAll } from "../../interfaces/back_office/register_bar";
import {
  AllRegisterTicketClosure,
  IRegisterTicketClosureBackOfficeService,
} from "../../interfaces/back_office/register_ticket_closure";
import { buildPagination } from "../../libs/buildPagination";
import { CloudinaryUpload } from "../../libs/cloudinary";
import { RegisterTicketClosure } from "../../models";
import { RegisterTicketClosureBackOfficeRepository } from "../../repositories/back_office/register_ticket_closure";

export class RegisterTicketClosureBackOfficeService
  implements IRegisterTicketClosureBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private registerTicketClosureBackOfficeRepository =
    new RegisterTicketClosureBackOfficeRepository();
  async update(
    id: UUID,
    body: Partial<RegisterTicketClosure>
  ): Promise<RegisterTicketClosure> {
    if (body.photo) {
      const photoURL = await CloudinaryUpload(body.photo);
      body.photo = photoURL;
    }
    return await this.registerTicketClosureBackOfficeRepository.update(
      id,
      body
    );
  }
  async delete(id: UUID): Promise<boolean> {
    return await this.registerTicketClosureBackOfficeRepository.delete(id);
  }
  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllRegisterTicketClosure[];
    count: number;
  }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const register_bars_closures =
      await this.registerTicketClosureBackOfficeRepository.getAll(
        where,
        pagination
      );
    return register_bars_closures as any;
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
                // { name: { [Op.iLike]: `%${queries.q}%` } },
                { "$RegisterTicket.name$": { [Op.iLike]: `%${queries.q}%` } },
              ],
            });
            break;
          case "startDate" || "endDate":
            where[Op.and].push({
              date: {
                [Op.between]: [queries.startDate, queries.endDate],
              },
            });
            break;
          case "CompanyId":
            where[Op.and].push({
              "$RegisterTicket.Branch.Group.Company.id$": {
                [Op.eq]: queries.CompanyId,
              },
            });
            break;
          case "GroupId":
            where[Op.and].push({
              "$RegisterTicket.Branch.Group.id$": { [Op.eq]: queries.GroupId },
            });
            break;
          case "BranchId":
            where[Op.and].push({
              "$RegisterTicket.Branch.id$": { [Op.eq]: queries.BranchId },
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
