import { Transaction } from "sequelize";
import { BodyCreate, IAuth_BOService } from "../../interfaces/back_office/auth";
import { encryptPassword } from "../../libs/encrypt_password";
import { generateToken } from "../../libs/jwt";
import { Auth_BO } from "../../models/back_office/auth";
import { Auth_BORepository } from "../../repositories/back_office/auth";
import { User_BORepository } from "../../repositories/back_office/user";

export class Auth_BOService implements IAuth_BOService {
  private authBORepository = new Auth_BORepository();
  private userBORepository = new User_BORepository();
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
  async logIn(body: Partial<Auth_BO>): Promise<string> {
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
