import { Transaction, WhereOptions } from "sequelize";
import { IBranchRepository } from "../../interfaces/branch";
import {
  Branch,
  Company,
  Group,
  RegisterBar,
  RegisterTicket,
} from "../../models";
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

  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ) {
    try {
      return await Branch.findAndCountAll({
        where,
        include: [
          { model: RegisterBar },
          { model: RegisterTicket },
          {
            model: Group,
            required: true,
            include: [{ model: Company, required: true }],
          },
        ],
        distinct: true,
        offset: pagination.offset,
        limit: pagination.limit,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`BRANCHES_NOT_FOUND`);
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
