import { Op, Sequelize, Transaction, WhereOptions } from "sequelize";
import {
  AllAdmins,
  AllUser,
  IUserBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/user";
import { buildPagination } from "../../libs/buildPagination";
import { UserBackOfficeRepository } from "../../repositories/back_office/user";
import { UserBO } from "../../models";
import { UUID } from "crypto";

export class UserBackOfficeService implements IUserBackOfficeService {
  private userBackOfficeRepository = new UserBackOfficeRepository();
  async getMe(id: UUID): Promise<UserBO> {
    return await this.userBackOfficeRepository.findById(id);
  }
  async getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllUser[]; count: number }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const users = await this.userBackOfficeRepository.getAll(where, pagination);
    return {
      count: users.count,
      rows: users.rows.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.Auth.email,
        dni: user.dni,
        role: user.role,
        photo: user.photo,
        phone: user.phone,
        branch: user.Branch.name,
        group: user.Branch.Group.name,
        company: user.Branch.Group.Company.name,
      })),
    };
  }

  async getAllAdmins(
    queries: QueriesGetAll
  ): Promise<{ rows: AllAdmins[]; count: number }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const admins = await this.userBackOfficeRepository.getAllAdmins(
      where,
      pagination
    );
    return {
      count: admins.count,
      rows: admins.rows.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.AuthBO.email,
        role: user.role,
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

  async create(
    data: Partial<UserBO>,
    transaction: Transaction
  ): Promise<UserBO> {
    return await this.userBackOfficeRepository.create(data, transaction);
  }

  async findByAuthId(id: UUID): Promise<UserBO> {
    return await this.userBackOfficeRepository.findByAuthId(id);
  }
}
