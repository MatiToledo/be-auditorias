import { Op, Sequelize, WhereOptions } from "sequelize";
import {
  AllUser,
  IUserBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/user";
import { buildPagination } from "../../libs/buildPagination";
import { UserBackOfficeRepository } from "../../repositories/back_office/user";
import { ICompanyBackOfficeService } from "../../interfaces/back_office/company";
import { Company } from "../../models";
import { CompanyBackOfficeRepository } from "../../repositories/back_office/company";

export class CompanyBackOfficeService implements ICompanyBackOfficeService {
  private companyBackOfficeRepository = new CompanyBackOfficeRepository();

  async getAll(): Promise<{ rows: Company[]; count: number }> {
    return await this.companyBackOfficeRepository.getAll();
  }
}
