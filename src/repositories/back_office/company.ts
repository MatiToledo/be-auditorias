import { Transaction, WhereOptions } from "sequelize";
import { ICompanyBackOfficeRepository } from "../../interfaces/back_office/company";
import { Branch, Company, Group } from "../../models";

export class CompanyBackOfficeRepository
  implements ICompanyBackOfficeRepository
{
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: Company[]; count: number }> {
    try {
      return await Company.findAndCountAll({
        where,
        include: [{ model: Group, include: [{ model: Branch }] }],
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`COMPANIES_NOT_FOUND`);
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
