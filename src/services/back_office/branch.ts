import { Transaction } from "sequelize";
import { IBranchBackOfficeService } from "../../interfaces/back_office/branch";
import { Branch } from "../../models";
import { BranchBackOfficeRepository } from "../../repositories/back_office/branch";

export class BranchBackOfficeService implements IBranchBackOfficeService {
  private branchBackOfficeRepository = new BranchBackOfficeRepository();
  async bulkCreate(
    data: Partial<Branch>[],
    transaction: Transaction
  ): Promise<Branch[]> {
    return await this.branchBackOfficeRepository.bulkCreate(data, transaction);
  }

  async getAllByGroupId(GroupId: string): Promise<Branch[]> {
    return await this.branchBackOfficeRepository.getAllByGroupId(GroupId);
  }
}
