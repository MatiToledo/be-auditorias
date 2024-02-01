import { Transaction } from "sequelize";
import { BodyCreate, IAuthService } from "../interfaces/auth";
import { Auth } from "../models";
import { AuthRepository } from "../repositories/auth";
import { UserRepository } from "../repositories/user";
import { encryptPassword } from "../libs/encrypt_password";
import { generateToken } from "../libs/jwt";
// ! Dont handle the error here, the controller must take it.

export class AuthService implements IAuthService {
  private authRepository = new AuthRepository();
  private userRepository = new UserRepository();
  async create(body: BodyCreate, transaction: Transaction): Promise<void> {
    await this.authRepository.findIfExistByEmail(body.Auth.email);
    const encryptedPassword = encryptPassword(body.Auth.password);
    const auth = await this.authRepository.create(
      { ...body.Auth, password: encryptedPassword },
      transaction
    );
    await this.userRepository.create(
      { AuthId: auth.id, ...body.User },
      transaction
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  async logIn(body: Partial<Auth>): Promise<string> {
    const encryptedPassword = encryptPassword(body.password);
    const auth = await this.authRepository.findIfExistByCredentials({
      ...body,
      password: encryptedPassword,
    });
    const user = await this.userRepository.findByAuthId(auth.id);
    const token = generateToken({ id: user.id, role: user.role });
    return token;
  }
}
