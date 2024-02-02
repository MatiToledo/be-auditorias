import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { User_BO } from "../../models/back_office/user";
import { IUser_BORepository } from "../../interfaces/back_office/user";

export class User_BORepository implements IUser_BORepository {
  async create(
    data: Partial<User_BO>,
    transaction: Transaction
  ): Promise<User_BO> {
    try {
      return await User_BO.create(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_CREATED`);
    }
  }

  async findByAuthId(id: UUID): Promise<User_BO> {
    try {
      return await User_BO.findOne({
        where: { AuthBOId: id },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`USER_NOT_FIND`);
    }
  }
}
