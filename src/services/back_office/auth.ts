import { Transaction } from "sequelize";
import {
  BodyCreate,
  IAuthBackOfficeService,
} from "../../interfaces/back_office/auth";
import { encryptPassword } from "../../libs/encrypt_password";
import { generateToken } from "../../libs/jwt";
import { AuthBO } from "../../models/back_office/auth";
import { AuthBackOfficeRepository } from "../../repositories/back_office/auth";
import { UserBackOfficeService } from "./user";
import { UUID } from "crypto";

export class AuthBackOfficeService implements IAuthBackOfficeService {
  private authBackOfficeRepository = new AuthBackOfficeRepository();
  private userBackOfficeService = new UserBackOfficeService();
  async createAdmin(body: BodyCreate, transaction: Transaction): Promise<void> {
    await this.authBackOfficeRepository.findIfExistByEmail(body.Auth.email);
    const encryptedPassword = encryptPassword(body.Auth.password);
    const auth = await this.authBackOfficeRepository.create(
      { ...body.Auth, password: encryptedPassword },
      transaction
    );
    await this.userBackOfficeService.create(
      { AuthBOId: auth.id, ...body.User },
      transaction
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  async logIn(body: Partial<AuthBO>): Promise<string> {
    const encryptedPassword = encryptPassword(body.password);
    const auth = await this.authBackOfficeRepository.findIfExistByCredentials({
      ...body,
      password: encryptedPassword,
    });
    const user = await this.userBackOfficeService.findByAuthId(auth.id);
    const token = generateToken({ id: user.id, role: user.role });
    return token;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  async update(
    id: UUID,
    body: Partial<AuthBO>,
    transaction: Transaction
  ): Promise<number> {
    return await this.authBackOfficeRepository.update(id, body, transaction);
  }
}
