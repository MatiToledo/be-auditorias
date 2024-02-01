import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { IUserRepository } from "../interfaces/user";
import { User } from "../models";

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
}
