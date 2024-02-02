import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { UserBO } from "../../models/back_office/user";
import { IUserBORepository } from "../../interfaces/back_office/user";

export class UserBORepository implements IUserBORepository {
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
      throw new Error(`USER_NOT_FIND`);
    }
  }
}
