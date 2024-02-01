import { IAuthRepository } from "../interfaces/auth";
import { Auth } from "../models";

export class AuthRepository implements IAuthRepository {
  async createInDB(data: Partial<Auth>): Promise<Auth> {
    try {
      return await Auth.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`AUTH_NOT_CREATED`);
    }
  }
}
