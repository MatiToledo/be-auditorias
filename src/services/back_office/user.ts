import { Op, Sequelize, Transaction, WhereOptions } from "sequelize";
import {
  AllAdmins,
  AllUser,
  IUserBackOfficeService,
  QueriesGetAll,
  UpdateAdminBody,
  UpdateUserBody,
} from "../../interfaces/back_office/user";
import { buildPagination } from "../../libs/buildPagination";
import { UserBackOfficeRepository } from "../../repositories/back_office/user";
import { UserBO } from "../../models";
import { UUID } from "crypto";
import { AuthBackOfficeRepository } from "../../repositories/back_office/auth";
import { encryptPassword } from "../../libs/encrypt_password";
import { UserRepository } from "../../repositories/user";
import { AuthRepository } from "../../repositories/auth";
import { CloudinaryUpload } from "../../libs/cloudinary";

export class UserBackOfficeService implements IUserBackOfficeService {
  private userBackOfficeRepository = new UserBackOfficeRepository();
  private userRepository = new UserRepository();
  private authRepository = new AuthRepository();
  private authBackOfficeRepository = new AuthBackOfficeRepository();
  async getMe(id: UUID): Promise<UserBO> {
    return await this.userBackOfficeRepository.findById(id);
  }
  async update(
    id: UUID,
    body: UpdateUserBody,
    transaction: Transaction
  ): Promise<void> {
    if (body.User.photo) {
      const photoURL = await CloudinaryUpload(body.User.photo);
      body.User.photo = photoURL;
    }
    const userUpdated = await this.userBackOfficeRepository.update(
      id,
      body.User,
      transaction
    );
    const user = await this.userRepository.findById(userUpdated.id);
    if (body.Auth.password) {
      body.Auth.password = encryptPassword(body.Auth.password);
    }
    await this.authRepository.update(user.Auth.id, body.Auth, transaction);
    return;
  }
  async updateAdmin(
    id: UUID,
    body: UpdateAdminBody,
    transaction: Transaction
  ): Promise<void> {
    console.log("body: ", body);
    const userUpdated = await this.userBackOfficeRepository.updateAdmin(
      id,
      body.User,
      transaction
    );
    const user = await this.userBackOfficeRepository.findById(userUpdated.id);
    if (body.Auth.password) {
      body.Auth.password = encryptPassword(body.Auth.password);
    }
    await this.authBackOfficeRepository.update(
      user.AuthBOId,
      body.Auth,
      transaction
    );
    return;
  }
  async delete(id: UUID): Promise<boolean> {
    return await this.userBackOfficeRepository.delete(id);
  }
  async getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllUser[]; count: number }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const users = await this.userBackOfficeRepository.getAll(where, pagination);
    return {
      count: users.count,
      rows: users.rows.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.Auth.email,
        dni: user.dni,
        role: user.role,
        photo: user.photo,
        phone: user.phone,
        branch: user.Branch.name,
        group: user.Branch.Group.name,
        company: user.Branch.Group.Company.name,
        BranchId: user.Branch.id,
        GroupId: user.Branch.Group.id,
        CompanyId: user.Branch.Group.Company.id,
      })),
    };
  }

  async getAllAdmins(
    queries: QueriesGetAll
  ): Promise<{ rows: AllAdmins[]; count: number }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const admins = await this.userBackOfficeRepository.getAllAdmins(
      where,
      pagination
    );
    return {
      count: admins.count,
      rows: admins.rows.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.AuthBO.email,
        role: user.role,
      })),
    };
  }

  private buildQueriesFilters(queries: QueriesGetAll) {
    const where = {
      [Op.and]: [],
    };
    for (const query of Object.keys(queries) as []) {
      if (queries[query]) {
        switch (query) {
          case "q":
            where[Op.and].push({
              [Op.or]: [
                { fullName: { [Op.iLike]: `%${queries.q}%` } },
                { "$Auth.email$": { [Op.iLike]: `%${queries.q}%` } },
              ],
            });
            break;
          case "CompanyId":
            where[Op.and].push({
              "$Branch.Group.Company.id$": { [Op.eq]: queries.CompanyId },
            });
            break;
          case "GroupId":
            where[Op.and].push({
              "$Branch.Group.id$": { [Op.eq]: queries.GroupId },
            });
            break;
          case "BranchId":
            where[Op.and].push({
              "$Branch.id$": { [Op.eq]: queries.BranchId },
            });
            break;
          default:
            break;
        }
      }
    }

    return where as WhereOptions;
  }

  async create(
    data: Partial<UserBO>,
    transaction: Transaction
  ): Promise<UserBO> {
    return await this.userBackOfficeRepository.create(data, transaction);
  }

  async findByAuthId(id: UUID): Promise<UserBO> {
    return await this.userBackOfficeRepository.findByAuthId(id);
  }
}
