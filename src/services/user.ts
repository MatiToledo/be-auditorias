import { Transaction } from "sequelize";
import { IUserService } from "../interfaces/user";
import { User } from "../models";
import { UserRepository } from "./../repositories/user";

export class UserService implements IUserService {
  private userRepository = new UserRepository();
  async create(
    data: Partial<User>,
    transaction: Transaction
  ): Promise<boolean> {
    await this.userRepository.create(data, transaction);
    return true;
  }
}
