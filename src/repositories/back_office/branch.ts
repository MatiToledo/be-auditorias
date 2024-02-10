import { Transaction } from "sequelize";
import { IBranchRepository } from "../../interfaces/branch";
import { Branch } from "../../models";
import { IBranchBackOfficeRepository } from "../../interfaces/back_office/branch";

export class BranchBackOfficeRepository implements IBranchBackOfficeRepository {
  async bulkCreate(
    data: Partial<Branch>[],
    transaction: Transaction
  ): Promise<Branch[]> {
    try {
      return await Branch.bulkCreate(data, {
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`BRANCHES_NOT_CREATED`);
    }
  }

  async getAllByGroupId(GroupId: string): Promise<Branch[]> {
    try {
      return await Branch.findAll({
        where: { GroupId },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`BRANCHES_NOT_FOUND`);
    }
  }
}
