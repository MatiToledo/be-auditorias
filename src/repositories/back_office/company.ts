import { Transaction, WhereOptions } from "sequelize";
import { ICompanyBackOfficeRepository } from "../../interfaces/back_office/company";
import { Branch, Company, Group } from "../../models";
import { UUID } from "crypto";

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
  async update(id: UUID, data: Partial<Company>): Promise<Company> {
    try {
      const [updatedInstitution, affectedRows] = await Company.update(data, {
        where: { id },
        returning: true,
      });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`COMPANY_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await Company.destroy({
        where: { id },
      });
      if (res > 0) {
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      if (error.message) {
        throw new Error("COMPANY_NOT_DELETED");
      } else {
        throw new Error("COMPANY_ERROR_DELETED");
      }
    }
  }

  async create(data: Partial<Company>): Promise<Company> {
    try {
      return await Company.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`COMPANY_NOT_CREATED`);
    }
  }
}
