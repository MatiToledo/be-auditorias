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
import { UUID } from "crypto";

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

  async update(id: UUID, data: Partial<Branch>): Promise<Branch> {
    try {
      const [updatedInstitution, affectedRows] = await Branch.update(data, {
        where: { id },
        returning: true,
      });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`BRANCH_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await Branch.destroy({
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
        throw new Error("BRANCH_NOT_DELETED");
      } else {
        throw new Error("BRANCH_ERROR_DELETED");
      }
    }
  }

  async create(data: Partial<Branch>): Promise<Branch> {
    try {
      return await Branch.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`BRANCH_NOT_CREATED`);
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
