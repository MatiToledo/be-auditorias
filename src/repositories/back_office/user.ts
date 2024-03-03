import { UUID } from "crypto";
import { Sequelize, Transaction, WhereOptions } from "sequelize";
import { IUserBackOfficeRepository } from "../../interfaces/back_office/user";
import { Auth, AuthBO, Branch, Company, Group, User } from "../../models";
import { UserBO } from "../../models/back_office/user";

export class UserBackOfficeRepository implements IUserBackOfficeRepository {
  async create(
    data: Partial<UserBO>,
    transaction: Transaction
  ): Promise<UserBO> {
    try {
      return await UserBO.create(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_CREATED`);
    }
  }

  async findById(id: UUID): Promise<UserBO> {
    try {
      return await UserBO.findOne({
        where: { id },
        include: [
          {
            model: AuthBO,
            attributes: [],
          },
        ],
        attributes: [
          "id",
          "fullName",
          [Sequelize.literal('"AuthBO"."email"'), "email"],
        ],
        raw: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_FOUND`);
    }
  }
  async findByAuthId(id: UUID): Promise<UserBO> {
    try {
      return await UserBO.findOne({
        where: { AuthBOId: id },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_FOUND`);
    }
  }

  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: User[]; count: number }> {
    try {
      return await User.findAndCountAll({
        where,
        include: [
          { model: Auth, attributes: ["id", "email"] },
          {
            model: Branch,
            attributes: ["id", "name"],
            include: [
              {
                model: Group,
                attributes: ["id", "name"],
                include: [{ model: Company, attributes: ["id", "name"] }],
              },
            ],
          },
        ],
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USERS_NOT_FOUND`);
    }
  }
  async getAllAdmins(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: UserBO[]; count: number }> {
    try {
      return await UserBO.findAndCountAll({
        where,
        include: [{ model: AuthBO, attributes: ["id", "email"] }],
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`ADMINS_NOT_FOUND`);
    }
  }
}
