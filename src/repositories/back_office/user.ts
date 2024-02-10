import { UUID } from "crypto";
import { Op, Transaction, WhereOptions } from "sequelize";
import { UserBO } from "../../models/back_office/user";
import { IUserBackOfficeRepository } from "../../interfaces/back_office/user";
import { User, Auth, Branch } from "../../models";

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
      console.log("where: ", where[Op.and][0]);
      return await User.findAndCountAll({
        where,
        include: [
          { model: Auth, attributes: ["id", "email"] },
          { model: Branch, attributes: ["id", "name"] },
        ],
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USERS_NOT_FOUND`);
    }
  }
}
