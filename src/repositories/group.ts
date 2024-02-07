import { Transaction } from "sequelize";
import { IGroupRepository } from "../interfaces/group";
import { Group } from "../models";

export class GroupRepository implements IGroupRepository {
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
