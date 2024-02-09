import { Op, Sequelize, Transaction, WhereOptions } from "sequelize";
import { IUserService, QueriesGetAll, UserMeType } from "../interfaces/user";
import { User } from "../models";
import { UserRepository } from "./../repositories/user";
import { UUID } from "crypto";

export class UserService implements IUserService {
  private userRepository = new UserRepository();
  async create(
    data: Partial<User>,
    transaction: Transaction
  ): Promise<boolean> {
    await this.userRepository.create(data, transaction);
    return true;
  }
  async getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: User[]; count: number }> {
    const where = this.buildQueriesFilters(queries);
    return this.userRepository.getAll(where);
  }

  async me(id: UUID): Promise<UserMeType> {
    const user = await this.userRepository.me(id);
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.Auth.email,
      role: user.role,
      photo: user.photo,
      BranchId: user.BranchId,
      branch: user.Branch.name,
      group: user.Branch.Group.name,
      company: user.Branch.Group.Company.name,
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
}
