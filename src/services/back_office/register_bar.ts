import { Op, Transaction, WhereOptions } from "sequelize";
import {
  AllRegisterBar,
  IRegisterBarBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/register_bar";
import { RegisterBar } from "../../models";
import { RegisterBarBackOfficeRepository } from "../../repositories/back_office/register_bar";
import { buildPagination } from "../../libs/buildPagination";

export class RegisterBarBackOfficeService
  implements IRegisterBarBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private registerBarBackOfficeRepository =
    new RegisterBarBackOfficeRepository();
  async bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]> {
    return await this.registerBarBackOfficeRepository.bulkCreate(
      data,
      transaction
    );
  }

  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllRegisterBar[];
    count: number;
  }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const register_bars = await this.registerBarBackOfficeRepository.getAll(
      where,
      pagination
    );
    return {
      count: register_bars.count,
      rows: register_bars.rows.map((register_bar) => ({
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
                { fullName: { [Op.iLike]: `%${queries.q}%` } },
                { "$Auth.email$": { [Op.iLike]: `%${queries.q}%` } },
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
