import { Op, WhereOptions } from "sequelize";
import { buildPagination } from "../../libs/buildPagination";
import {
  AllTreasuryNightExpense,
  ITreasuryNightExpenseBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/treasury_night_expense";
import { TreasuryNightExpenseBackOfficeRepository } from "../../repositories/back_office/treasury_night_expense";

export class TreasuryNightExpenseBackOfficeService
  implements ITreasuryNightExpenseBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private treasuryNightExpenseBackOfficeRepository =
    new TreasuryNightExpenseBackOfficeRepository();

  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllTreasuryNightExpense[];
    count: number;
  }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const register_bars_closures =
      await this.treasuryNightExpenseBackOfficeRepository.getAll(
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
                { "$RegisterTicket.name$": { [Op.iLike]: `%${queries.q}%` } },
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
              "$Branch.Group.Company.id$": {
                [Op.eq]: queries.CompanyId,
              },
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
          case "ConceptId":
            where[Op.and].push({
              "$Concept.id$": { [Op.eq]: queries.ConceptId },
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
