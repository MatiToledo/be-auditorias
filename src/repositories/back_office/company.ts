import { Transaction } from "sequelize";
import { ICompanyBackOfficeRepository } from "../../interfaces/back_office/company";
import { Company } from "../../models";

export class CompanyBackOfficeRepository
  implements ICompanyBackOfficeRepository
{
  async getAll(): Promise<Company[]> {
    try {
      return await Company.findAll();
    } catch (error) {
      console.error(error);
      throw new Error(`COMPANIES_NOT_FIND`);
    }
  }

  async create(
    data: Partial<Company>,
    transaction: Transaction
  ): Promise<Company> {
    try {
      return await Company.create(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BAR_NOT_CREATED`);
    }
  }
}
