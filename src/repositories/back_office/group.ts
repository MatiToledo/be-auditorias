import { UUID } from "crypto";
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
  async update(id: UUID, data: Partial<Group>): Promise<Group> {
    try {
      const [updatedInstitution, affectedRows] = await Group.update(data, {
        where: { id },
        returning: true,
      });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`GROUP_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await Group.destroy({
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
        throw new Error("GROUP_NOT_DELETED");
      } else {
        throw new Error("GROUP_ERROR_DELETED");
      }
    }
  }

  async create(data: Partial<Group>): Promise<Group> {
    try {
      return await Group.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`GROUP_NOT_CREATED`);
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
        order: [["createdAt", "DESC"]],
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
