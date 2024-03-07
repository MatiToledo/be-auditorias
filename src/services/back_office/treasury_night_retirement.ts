import { Op, WhereOptions } from "sequelize";
import { QueriesGetAll } from "../../interfaces/back_office/register_bar";
import {
  AllTreasuryNightRetirement,
  ITreasuryNightRetirementBackOfficeService,
} from "../../interfaces/back_office/treasury_night_retirement";
import { buildPagination } from "../../libs/buildPagination";
import { TreasuryNightRetirementBackOfficeRepository } from "../../repositories/back_office/treasury_night_retirement";
import { TreasuryNightRetirement } from "../../models";
import { UUID } from "crypto";

export class TreasuryNightRetirementBackOfficeService
  implements ITreasuryNightRetirementBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private treasuryNightRetirementBackOfficeRepository =
    new TreasuryNightRetirementBackOfficeRepository();
  async update(
    id: UUID,
    body: Partial<TreasuryNightRetirement>
  ): Promise<TreasuryNightRetirement> {
    return await this.treasuryNightRetirementBackOfficeRepository.update(
      id,
      body
    );
  }
  async delete(id: UUID): Promise<boolean> {
    return await this.treasuryNightRetirementBackOfficeRepository.delete(id);
  }
  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllTreasuryNightRetirement[];
    count: number;
  }> {
    // const where = { [Op.and]: [] };
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const retirements =
      await this.treasuryNightRetirementBackOfficeRepository.getAll(
        where,
        pagination
      );

    return {
      count: retirements.count,
      rows: retirements.rows.map((retirement) => {
        return {
          id: retirement.id,
          type: retirement.type,
          date: retirement.date as any,
          amount: retirement.amount,
          RegisterBarId: retirement.dataValues.RegisterBarId,
          RegisterTicketId: retirement.dataValues.RegisterTicketId,
          BranchId: retirement.dataValues.BarBranchId
            ? retirement.dataValues.BarBranchId
            : retirement.dataValues.TicketBranchId,
          register: retirement.dataValues.register_bar
            ? retirement.dataValues.register_bar
            : retirement.dataValues.register_ticket,
        };
      }),
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
              [Op.or]: [
                {
                  "$RegisterBar.Branch.Group.Company.id$": {
                    [Op.eq]: queries.CompanyId,
                  },
                },
                {
                  "$RegisterTicket.Branch.Group.Company.id$": {
                    [Op.eq]: queries.CompanyId,
                  },
                },
              ],
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
