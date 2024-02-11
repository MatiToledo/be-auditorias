import { Transaction, WhereOptions } from "sequelize";
import { IGroupBackOfficeRepository } from "../../interfaces/back_office/group";
import { Branch, Company, Group } from "../../models";

export class GroupBackOfficeRepository implements IGroupBackOfficeRepository {
  async bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]> {
    try {
      return await Group.bulkCreate(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`GROUPS_NOT_CREATED`);
    }
  }

  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: Group[]; count: number }> {
    try {
      return await Group.findAndCountAll({
        where,
        include: [{ model: Branch }, { model: Company, required: true }],
        distinct: true,
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`GROUPS_NOT_FOUND`);
    }
  }
  async getAllByCompanyId(CompanyId: string): Promise<Group[]> {
    try {
      return await Group.findAll({
        where: { CompanyId },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`GROUPS_NOT_FOUND`);
    }
  }
}
