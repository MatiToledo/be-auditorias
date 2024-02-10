import { Transaction } from "sequelize";
import { IGroupBackOfficeService } from "../../interfaces/back_office/group";
import { Group } from "../../models";
import { GroupBackOfficeRepository } from "../../repositories/back_office/group";

export class GroupBackOfficeService implements IGroupBackOfficeService {
  private groupBackOfficeRepository = new GroupBackOfficeRepository();
  async bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]> {
    return await this.groupBackOfficeRepository.bulkCreate(data, transaction);
  }

  async getAllByCompanyId(CompanyId: string): Promise<Group[]> {
    return await this.groupBackOfficeRepository.getAllByCompanyId(CompanyId);
  }
}
