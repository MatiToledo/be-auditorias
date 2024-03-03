import { Op, Transaction, WhereOptions } from "sequelize";
import {
  AllGroup,
  IGroupBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/group";
import { buildPagination } from "../../libs/buildPagination";
import { Group } from "../../models";
import { GroupBackOfficeRepository } from "../../repositories/back_office/group";

export class GroupBackOfficeService implements IGroupBackOfficeService {
  private groupBackOfficeRepository = new GroupBackOfficeRepository();
  async bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]> {
    return await this.groupBackOfficeRepository.bulkCreate(data, transaction);
  }
  async create(body: Partial<Group>): Promise<Group> {
    return await this.groupBackOfficeRepository.create(body);
  }

  async getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllGroup[]; count: number }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const groups = await this.groupBackOfficeRepository.getAll(
      where,
      pagination
    );
    return {
      count: groups.count,
      rows: groups.rows.map((group) => ({
        id: group.id,
        name: group.name,
        company: group.Company.name,
        branchesCant: group.Branches.length,
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
              [Op.or]: [{ name: { [Op.iLike]: `%${queries.q}%` } }],
            });
            break;
          case "CompanyId":
            where[Op.and].push({
              "$Company.id$": { [Op.eq]: queries.CompanyId },
            });
            break;
          default:
            break;
        }
      }
    }

    return where as WhereOptions;
  }
  async getAllByCompanyId(CompanyId: string): Promise<Group[]> {
    return this.groupBackOfficeRepository.getAllByCompanyId(CompanyId);
  }
}
