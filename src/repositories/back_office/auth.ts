import { Transaction } from "sequelize";
import { IAuth_BORepository } from "../../interfaces/back_office/auth";
import { Auth_BO } from "../../models/back_office/auth";

export class Auth_BORepository implements IAuth_BORepository {
  async create(
    data: Partial<Auth_BO>,
    transaction: Transaction
  ): Promise<Auth_BO> {
    try {
      return await Auth_BO.create(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`AUTH_NOT_CREATED`);
    }
  }
  async findIfExistByEmail(email: string): Promise<void> {
    try {
      const auth = await Auth_BO.findOne({
        where: { email },
      });
      if (auth) {
        throw new Error();
      }
      return;
    } catch (error) {
      console.error(error);
      if (error.message) {
        throw new Error(`AUTH_FIND_ERROR`);
      }
      throw new Error(`AUTH_ALREADY_EXISTS`);
    }
  }
  async findIfExistByCredentials(data: Partial<Auth_BO>): Promise<Auth_BO> {
    try {
      const auth = await Auth_BO.findOne({
        where: data,
      });
      if (!auth) {
        throw new Error();
      }
      return auth;
    } catch (error) {
      console.error(error);
      if (error.message) {
        throw new Error(`AUTH_FIND_ERROR`);
      }
      throw new Error(`AUTH_NOT_EXISTS`);
    }
  }
}
