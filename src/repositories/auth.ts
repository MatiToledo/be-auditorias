import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { IAuthRepository } from "../interfaces/auth";
import { Auth } from "../models";

export class AuthRepository implements IAuthRepository {
  async create(data: Partial<Auth>, transaction: Transaction): Promise<Auth> {
    try {
      return await Auth.create(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`AUTH_NOT_CREATED`);
    }
  }
  async update(
    id: UUID,
    data: Partial<Auth>,
    transaction: Transaction
  ): Promise<number> {
    try {
      const [affectedCount] = await Auth.update(data, {
        where: { id },
        transaction,
      });
      return affectedCount;
    } catch (error) {
      console.error(error);
      throw new Error(`AUTH_NOT_UPDATED`);
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
        throw new Error(`AUTH_FOUND_ERROR`);
      }
      throw new Error(`AUTH_ALREADY_EXISTS`);
    }
  }
  async findIfExistByCredentials(data: Partial<Auth>): Promise<Auth> {
    try {
      const auth = await Auth.findOne({
        where: data,
      });
      if (!auth) {
        throw new Error();
      }
      return auth;
    } catch (error) {
      console.error(error);
      if (error.message) {
        throw new Error(`AUTH_FOUND_ERROR`);
      }
      throw new Error(`AUTH_NOT_EXISTS`);
    }
  }
}
