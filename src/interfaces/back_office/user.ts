import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { UserBO } from "../../models/back_office/user";
import { Auth, User } from "../../models";
export interface IUserBackOfficeService {
  getAll(queries: QueriesGetAll): Promise<{ rows: AllUser[]; count: number }>;
  create(data: Partial<UserBO>, transaction: Transaction): Promise<UserBO>;
  findByAuthId(id: UUID): Promise<UserBO>;
}

export interface IUserBackOfficeRepository {
  create(data: Partial<UserBO>, transaction: Transaction): Promise<UserBO>;
  findByAuthId(id: UUID): Promise<UserBO>;
}

export interface AllUser {
  id: UUID;
  fullName: string;
  email: string;
  role: string;
  dni: number;
  photo: string;
  phone: number;
  branch: string;
  group: string;
  company: string;
}
export interface AllAdmins {
  id: UUID;
  fullName: string;
  email: string;
}

export interface QueriesGetAll {
  q?: string;
  limit?: string;
  page?: string;
  CompanyId?: string;
  GroupId?: string;
  BranchId?: string;
}

export interface UpdateAdminBody {
  User?: {
    fullName?: string;
  };
  Auth?: {
    password?: string;
    email?: string;
  };
}
export interface UpdateUserBody {
  User?: Partial<User>;
  Auth?: Partial<Auth>;
}
