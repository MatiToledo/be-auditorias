import { UserRepository } from "./../repositories/user";
import { IUserService } from "../interfaces/user";
import { Auth, User } from "../models";
import { AuthRepository } from "../repositories/auth";
import { Transaction } from "sequelize";

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
