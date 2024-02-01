import { IAuth_BORepository } from "../../interfaces/back_office/auth";

export class Auth_BORepository implements IAuth_BORepository {
  // async create(data: Partial<Auth>, transaction: Transaction): Promise<Auth> {
  //   try {
  //     return await Auth.create(data, {
  //       transaction,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error(`AUTH_NOT_CREATED`);
  //   }
  // }
  // async findIfExistByEmail(email: string): Promise<void> {
  //   try {
  //     const auth = await Auth.findOne({
  //       where: { email },
  //     });
  //     if (auth) {
  //       throw new Error();
  //     }
  //     return;
  //   } catch (error) {
  //     console.error(error);
  //     if (error.message) {
  //       throw new Error(`AUTH_FIND_ERROR`);
  //     }
  //     throw new Error(`AUTH_ALREADY_EXISTS`);
  //   }
  // }
  // async findIfExistByCredentials(data: Partial<Auth>): Promise<Auth> {
  //   try {
  //     const auth = await Auth.findOne({
  //       where: data,
  //     });
  //     if (!auth) {
  //       throw new Error();
  //     }
  //     return auth;
  //   } catch (error) {
  //     console.error(error);
  //     if (error.message) {
  //       throw new Error(`AUTH_FIND_ERROR`);
  //     }
  //     throw new Error(`AUTH_NOT_EXISTS`);
  //   }
  // }
}
