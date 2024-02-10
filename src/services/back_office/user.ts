import { Op, Sequelize, Transaction, WhereOptions } from "sequelize";
import {
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
                {
                  fullName: { [Op.iLike]: `%${queries.q}%` },
                },
                Sequelize.literal(`"Auth"."email" ILIKE '%${queries.q}%'`),
              ].filter(Boolean),
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
