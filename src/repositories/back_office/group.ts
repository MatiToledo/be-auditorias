import { Transaction } from "sequelize";
import { IGroupBackOfficeRepository } from "../../interfaces/back_office/group";
import { Group } from "../../models";

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
