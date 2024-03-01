import { Op, Transaction, WhereOptions } from "sequelize";
import {
  AllRegisterBar,
  IRegisterBarBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/register_bar";
import { RegisterBar } from "../../models";
import { RegisterBarBackOfficeRepository } from "../../repositories/back_office/register_bar";
import { buildPagination } from "../../libs/buildPagination";
import {
  AllRegisterBarClosure,
  IRegisterBarClosureBackOfficeService,
} from "../../interfaces/back_office/register_bar_closure";
import { RegisterBarClosureBackOfficeRepository } from "../../repositories/back_office/register_bar_closure";

export class RegisterBarClosureBackOfficeService
  implements IRegisterBarClosureBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private registerBarClosureBackOfficeRepository =
    new RegisterBarClosureBackOfficeRepository();

  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllRegisterBarClosure[];
    count: number;
  }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const register_bars_closures =
      await this.registerBarClosureBackOfficeRepository.getAll(
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
                { "$RegisterBar.name$": { [Op.iLike]: `%${queries.q}%` } },
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
              "$RegisterBar.Branch.Group.Company.id$": {
                [Op.eq]: queries.CompanyId,
              },
            });
            break;
          case "GroupId":
            where[Op.and].push({
              "$RegisterBar.Branch.Group.id$": { [Op.eq]: queries.GroupId },
            });
            break;
          case "BranchId":
            where[Op.and].push({
              "$RegisterBar.Branch.id$": { [Op.eq]: queries.BranchId },
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
