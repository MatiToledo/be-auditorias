import { Transaction } from "sequelize";
import { Group } from "./../models/group";

export interface IGroupService {}

export interface IGroupRepository {
  bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]>;
}
