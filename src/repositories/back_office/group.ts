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
}
