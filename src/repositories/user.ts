import { UUID } from "crypto";
import { Op, Transaction, WhereOptions } from "sequelize";
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

  async findById(id: UUID): Promise<User> {
    try {
      return await User.findOne({
        where: { id },
        include: [{ model: Auth }],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_FOUND`);
    }
  }
  async findByAuthId(id: UUID): Promise<User> {
    try {
      return await User.findOne({
        where: { AuthId: id },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_FOUND`);
    }
  }
  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await User.destroy({
        where: { id },
      });
      if (res > 0) {
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      if (error.message) {
        throw new Error("USER_NOT_DELETED");
      } else {
        throw new Error("USER_ERROR_DELETED");
      }
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
      throw new Error(`USER_NOT_FOUND`);
    }
  }
}
