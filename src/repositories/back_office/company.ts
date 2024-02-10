import { UUID } from "crypto";
import { Op, Transaction, WhereOptions } from "sequelize";
import { UserBO } from "../../models/back_office/user";
import { IUserBackOfficeRepository } from "../../interfaces/back_office/user";
import { User, Auth, Branch, Company } from "../../models";
import { ICompanyBackOfficeRepository } from "../../interfaces/back_office/company";

export class CompanyBackOfficeRepository
  implements ICompanyBackOfficeRepository
{
  async getAll(): Promise<{ rows: Company[]; count: number }> {
    try {
      return await Company.findAndCountAll({});
    } catch (error) {
      console.error(error);
      throw new Error(`COMPANIES_NOT_FIND`);
    }
  }
}
