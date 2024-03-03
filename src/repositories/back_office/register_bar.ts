import { Transaction, WhereOptions } from "sequelize";
import { IRegisterBarBackOfficeRepository } from "../../interfaces/back_office/register_bar";
import { Branch, Company, Group, RegisterBar } from "../../models";

export class RegisterBarBackOfficeRepository
  implements IRegisterBarBackOfficeRepository
{
  async bulkCreate(
    data: Partial<RegisterBar>[],
    transaction: Transaction
  ): Promise<RegisterBar[]> {
    try {
      return await RegisterBar.bulkCreate(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BARS_NOT_CREATED`);
    }
  }
  async create(data: Partial<RegisterBar>): Promise<RegisterBar> {
    try {
      return await RegisterBar.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BAR_NOT_CREATED`);
    }
  }
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: RegisterBar[]; count: number }> {
    try {
      return await RegisterBar.findAndCountAll({
        where,
        include: [
          {
            model: Branch,
            required: true,
            include: [
              {
                model: Group,
                required: true,
                include: [{ model: Company, required: true }],
              },
            ],
          },
        ],
        distinct: true,
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BARS_NOT_FOUND`);
    }
  }
}
