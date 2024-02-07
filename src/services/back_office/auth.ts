import { Transaction } from "sequelize";
import { BodyCreate, IAuthBOService } from "../../interfaces/back_office/auth";
import { encryptPassword } from "../../libs/encrypt_password";
import { generateToken } from "../../libs/jwt";
import { AuthBO } from "../../models/back_office/auth";
import { AuthBORepository } from "../../repositories/back_office/auth";
import { UserBORepository } from "../../repositories/back_office/user";

export class AuthBOService implements IAuthBOService {
  private authBORepository = new AuthBORepository();
  private userBORepository = new UserBORepository();
  async create(body: BodyCreate, transaction: Transaction): Promise<void> {
    await this.authBORepository.findIfExistByEmail(body.Auth.email);
    const encryptedPassword = encryptPassword(body.Auth.password);
    const auth = await this.authBORepository.create(
      { ...body.Auth, password: encryptedPassword },
      transaction
    );
    await this.userBORepository.create(
      { AuthBOId: auth.id, ...body.User },
      transaction
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  async logIn(body: Partial<AuthBO>): Promise<string> {
    const encryptedPassword = encryptPassword(body.password);
    const auth = await this.authBORepository.findIfExistByCredentials({
      ...body,
      password: encryptedPassword,
    });
    const user = await this.userBORepository.findByAuthId(auth.id);
    const token = generateToken({ id: user.id, role: user.role });
    return token;
  }
}
