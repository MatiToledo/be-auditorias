import { Op, WhereOptions } from "sequelize";
import {
  ICashRegisterBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/cash_register";
import { buildPagination } from "../../libs/buildPagination";
import { CashRegister } from "../../models/cash_register";
import { CashRegisterBackOfficeRepository } from "../../repositories/back_office/cash_register";

export class CashRegisterBackOfficeService
  implements ICashRegisterBackOfficeService
{
  private cashRegisterBackOfficeRepository =
    new CashRegisterBackOfficeRepository();

  async getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: CashRegister[]; count: number }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const cash_registers = await this.cashRegisterBackOfficeRepository.getAll(
      where,
      pagination
    );
    return cash_registers;
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
              [Op.or]: [{ name: { [Op.iLike]: `%${queries.q}%` } }],
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
          default:
            break;
        }
      }
    }

    return where as WhereOptions;
  }
}
