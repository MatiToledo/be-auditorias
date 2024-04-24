import { Transaction } from "sequelize";
import { ICompanyRepository } from "../interfaces/company";
import { Company } from "../models";

export class CompanyRepository implements ICompanyRepository {
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
      throw new Error(`COMPANY_NOT_CREATED`);
    }
  }
}
