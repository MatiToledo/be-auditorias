import { UUID } from "crypto";
import { Op, WhereOptions } from "sequelize";
import {
  AllTreasuryCentral,
  ITreasuryCentralBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/treasury_central";
import { TreasuryCentralMovements } from "../../interfaces/treasury_central";
import { buildPagination } from "../../libs/buildPagination";
import { TreasuryCentral } from "../../models";
import { TreasuryCentralBackOfficeRepository } from "../../repositories/back_office/treasury_central";

export class TreasuryCentralBackOfficeService
  implements ITreasuryCentralBackOfficeService
{
  /////////////////////////////////////////////////////////////////////////////////////////////
  private treasuryCentralBackOfficeRepository =
    new TreasuryCentralBackOfficeRepository();
  async update(
    id: UUID,
    body: Partial<TreasuryCentral>
  ): Promise<TreasuryCentral> {
    return await this.treasuryCentralBackOfficeRepository.update(id, body);
  }
  async delete(id: UUID): Promise<boolean> {
    return await this.treasuryCentralBackOfficeRepository.delete(id);
  }
  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllTreasuryCentral[];
    count: number;
  }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const movements = await this.treasuryCentralBackOfficeRepository.getAll(
      where,
      pagination
    );

    let balanceCash = 0;
    let balanceBank = 0;
    let balanceTransfer = 0;
    function pushBalanceValue(balance, type, amount) {
      if (type === "revenue") {
        balance += amount;
      } else if (type === "expense") {
        balance -= amount;
      }
      return balance;
    }
    const movementsWithBalance: TreasuryCentralMovements[] = movements.rows.map(
      (movement) => {
        switch (movement.payment_method) {
          case "cash":
            balanceCash = pushBalanceValue(
              balanceCash,
              movement.type,
              movement.amount
            );
            break;
          case "bank":
            balanceBank = pushBalanceValue(
              balanceBank,
              movement.type,
              movement.amount
            );
            break;
          case "transfer":
            balanceTransfer = pushBalanceValue(
              balanceTransfer,
              movement.type,
              movement.amount
            );
            break;

          default:
            break;
        }

        return {
          ...movement.dataValues,
          balanceCash,
          balanceBank,
          balanceTransfer,
        };
      }
    );

    return {
      count: movements.count,
      rows: movementsWithBalance,
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
