import { Transaction } from "sequelize";
import { IAuthRepository } from "../interfaces/auth";
import { IUserRepository } from "../interfaces/user";
import { Auth, User } from "../models";

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
}
