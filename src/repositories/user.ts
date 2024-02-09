import { UUID } from "crypto";
import { Transaction, WhereOptions } from "sequelize";
import { IUserRepository } from "../interfaces/user";
import { Auth, Branch, Company, Group, User } from "../models";

export class UserRepository implements IUserRepository {
  async create(data: Partial<User>, transaction: Transaction): Promise<User> {
    try {
      return await User.create(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_CREATED`);
    }
  }

  async getAll(where: WhereOptions): Promise<{ rows: User[]; count: number }> {
    try {
      return await User.findAndCountAll({ where });
    } catch (error) {
      console.error(error);
      throw new Error(`USERS_NOT_FIND`);
    }
  }

  async findByAuthId(id: UUID): Promise<User> {
    try {
      return await User.findOne({
        where: { AuthId: id },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_FIND`);
    }
  }

  async me(id: UUID): Promise<User> {
    try {
      return await User.findOne({
        where: { id },
        include: [
          { model: Auth, attributes: ["email"] },
          {
            model: Branch,
            include: [{ model: Group, include: [{ model: Company }] }],
          },
        ],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_FIND`);
    }
  }
}
