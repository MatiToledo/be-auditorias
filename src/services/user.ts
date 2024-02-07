import { Transaction } from "sequelize";
import { IUserService, UserMeType } from "../interfaces/user";
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
}
