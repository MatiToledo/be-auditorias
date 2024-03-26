import { UUID } from "crypto";
import { Op, Transaction, WhereOptions } from "sequelize";
import {
  AllBranch,
  IBranchBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/branch";
import { buildPagination } from "../../libs/buildPagination";
import { Branch } from "../../models";
import { BranchBackOfficeRepository } from "../../repositories/back_office/branch";

export class BranchBackOfficeService implements IBranchBackOfficeService {
  private branchBackOfficeRepository = new BranchBackOfficeRepository();
  async bulkCreate(
    data: Partial<Branch>[],
    transaction: Transaction
  ): Promise<Branch[]> {
    return await this.branchBackOfficeRepository.bulkCreate(data, transaction);
  }
  async create(body: Partial<Branch>): Promise<Branch> {
    return await this.branchBackOfficeRepository.create(body);
  }
  async update(id: UUID, body: Partial<Branch>): Promise<Branch> {
    return await this.branchBackOfficeRepository.update(id, body);
  }
  async delete(id: UUID): Promise<boolean> {
    return await this.branchBackOfficeRepository.delete(id);
  }
  async getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllBranch[]; count: number }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const branches = await this.branchBackOfficeRepository.getAll(
      where,
      pagination
    );
    return {
      count: branches.count,
      rows: branches.rows.map((branch) => ({
        id: branch.id,
        name: branch.name,
        group: branch.Group.name,
        company: branch.Group.Company.name,
        barsCant: branch.RegisterBars.length,
        ticketsCant: branch.RegisterTickets.length,
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
          case "GroupId":
            where[Op.and].push({
              "$Group.id$": { [Op.eq]: queries.GroupId },
            });
            break;
          case "CompanyId":
            where[Op.and].push({
              "$Group.Company.id$": { [Op.eq]: queries.CompanyId },
            });
            break;
          default:
            break;
        }
      }
    }

    return where as WhereOptions;
  }
  async getAllByGroupId(GroupId: string): Promise<Branch[]> {
    return await this.branchBackOfficeRepository.getAllByGroupId(GroupId);
  }
}
