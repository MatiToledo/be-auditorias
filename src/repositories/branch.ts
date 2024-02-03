import { Transaction } from "sequelize";
import { IBranchRepository } from "../interfaces/branch";
import { Branch } from "../models";

export class BranchRepository implements IBranchRepository {
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
}
