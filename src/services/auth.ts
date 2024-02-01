import { IAuthService } from "../interfaces/auth";
import { Auth } from "../models";
import { AuthRepository } from "../repositories/auth";
// ! Dont handle the error here, the controller must take it.

export class AuthService implements IAuthService {
  private authRepository = new AuthRepository();
  async create(data: Partial<Auth>): Promise<boolean> {
    await this.authRepository.createInDB(data);
    return true;
  }
}
