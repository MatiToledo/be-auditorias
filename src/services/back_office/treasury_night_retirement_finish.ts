import { UUID } from "crypto";
import { Op, WhereOptions } from "sequelize";
import { QueriesGetAll } from "../../interfaces/back_office/register_bar";
import {
  AllTreasuryNightRetirementFinish,
  ITreasuryNightRetirementFinishBackOfficeService,
} from "../../interfaces/back_office/treasury_night_retirement_finish";
import { buildPagination } from "../../libs/buildPagination";
import { TreasuryNightRetirementFinish } from "../../models";
import { TreasuryNightRetirementFinishBackOfficeRepository } from "../../repositories/back_office/treasury_night_retirement_finish";

export class TreasuryNightRetirementFinishBackOfficeService
  implements ITreasuryNightRetirementFinishBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private treasuryNightRetirementFinishBackOfficeRepository =
    new TreasuryNightRetirementFinishBackOfficeRepository();
  async update(
    id: UUID,
    body: Partial<TreasuryNightRetirementFinish>
  ): Promise<TreasuryNightRetirementFinish> {
    return await this.treasuryNightRetirementFinishBackOfficeRepository.update(
      id,
      body
    );
  }
  async delete(id: UUID): Promise<boolean> {
    return await this.treasuryNightRetirementFinishBackOfficeRepository.delete(
      id
    );
  }
  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllTreasuryNightRetirementFinish[];
    count: number;
  }> {
    // const where = { [Op.and]: [] };
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const retirements_finish =
      await this.treasuryNightRetirementFinishBackOfficeRepository.getAll(
        where,
        pagination
      );
    return {
      count: retirements_finish.count,
      rows: retirements_finish.rows.map((retirement_finish) => {
        return {
          id: retirement_finish.id,
          type: retirement_finish.type,
          date: retirement_finish.date as any,
          expenses: retirement_finish.expenses,
          postnet: retirement_finish.postnet,
          transfers: retirement_finish.transfers,
          amount: retirement_finish.amount,
          RegisterBarId: retirement_finish.dataValues.RegisterBarId,
          RegisterTicketId: retirement_finish.dataValues.RegisterTicketId,
          BranchId: retirement_finish.dataValues.BarBranchId
            ? retirement_finish.dataValues.BarBranchId
            : retirement_finish.dataValues.TicketBranchId,
          register: retirement_finish.dataValues.register_bar
            ? retirement_finish.dataValues.register_bar
            : retirement_finish.dataValues.register_ticket,
          isEdited: retirement_finish.dataValues.isEdited,
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
