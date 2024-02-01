import { Transaction } from "sequelize";
import { IAuthRepository } from "../interfaces/auth";
import { Auth } from "../models";

export class AuthRepository implements IAuthRepository {
  async create(data: Partial<Auth>, transaction: Transaction): Promise<Auth> {
    try {
      console.log("data: ", data);
      return await Auth.create(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`AUTH_NOT_CREATED`);
    }
  }
  async findIfExistByEmail(email: string): Promise<void> {
    try {
      const auth = await Auth.findOne({
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
}
