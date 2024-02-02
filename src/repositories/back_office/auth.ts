import { Transaction } from "sequelize";
import { IAuthBORepository } from "../../interfaces/back_office/auth";
import { AuthBO } from "../../models/back_office/auth";

export class AuthBORepository implements IAuthBORepository {
  async create(
    data: Partial<AuthBO>,
    transaction: Transaction
  ): Promise<AuthBO> {
    try {
      return await AuthBO.create(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`AUTH_NOT_CREATED`);
    }
  }
  async findIfExistByEmail(email: string): Promise<void> {
    try {
      const auth = await AuthBO.findOne({
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
  async findIfExistByCredentials(data: Partial<AuthBO>): Promise<AuthBO> {
    try {
      const auth = await AuthBO.findOne({
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
