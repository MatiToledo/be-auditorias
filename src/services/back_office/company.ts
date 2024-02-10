import { UUID } from "crypto";
import { Transaction } from "sequelize";
import {
  BodyCreateCompany,
  GroupBodyCreate,
  ICompanyBackOfficeService,
} from "../../interfaces/back_office/company";
import {
  Branch,
  Company,
  Group,
  RegisterBar,
  RegisterTicket,
} from "../../models";
import { CompanyBackOfficeRepository } from "../../repositories/back_office/company";
import { BranchBackOfficeService } from "./branch";
import { GroupBackOfficeService } from "./group";
import { RegisterBarBackOfficeService } from "./register_bar";

export class CompanyBackOfficeService implements ICompanyBackOfficeService {
  private companyBackOfficeRepository = new CompanyBackOfficeRepository();
  private groupBackOfficeService = new GroupBackOfficeService();
  private branchBackOfficeService = new BranchBackOfficeService();
  private registerBarBackOfficeService = new RegisterBarBackOfficeService();
  private registerTicketBackOfficeService = new RegisterBarBackOfficeService();
  async getAll(): Promise<Company[]> {
    return await this.companyBackOfficeRepository.getAll();
  }

  async create(
    body: BodyCreateCompany,
    transaction: Transaction
  ): Promise<void> {
    const company = await this.companyBackOfficeRepository.create(
      body.Company,
      transaction
    );
    const groupsWithCompanyId = this.addCompanyIdToGroup(
      body.Groups,
      company.id
    );
    const createdGroups = await this.groupBackOfficeService.bulkCreate(
      groupsWithCompanyId,
      transaction
    );
    const branchesWithGroupId = this.addGroupIdToBranches(
      body.Groups,
      createdGroups
    );
    const createdBranches = await this.branchBackOfficeService.bulkCreate(
      branchesWithGroupId,
      transaction
    );
    const [registerBarsWithBranchId, registerTicketsWithBranchId] =
      this.addBranchIdToRegister(body.Groups, createdBranches);
    await this.registerBarBackOfficeService.bulkCreate(
      registerBarsWithBranchId,
      transaction
    );
    await this.registerTicketBackOfficeService.bulkCreate(
      registerTicketsWithBranchId,
      transaction
    );
    return;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  private addCompanyIdToGroup(groups: GroupBodyCreate[], CompanyId: UUID) {
    return groups.map((group) => {
      group.CompanyId = CompanyId;
      return group;
    });
  }

  private addGroupIdToBranches(
    groups: { name: string; Branches: Partial<Branch>[] }[],
    createdGroups: Group[]
  ) {
    const branchesWithGroupId: Partial<Branch>[] = [];
    createdGroups.forEach((createdGroup: Group) => {
      groups.forEach((group) => {
        if (group.name === createdGroup.name) {
          group.Branches.forEach((branch: Partial<Branch>) => {
            branch.GroupId = createdGroup.id;
            branchesWithGroupId.push(branch);
          });
        }
      });
    });
    return branchesWithGroupId;
  }
  private addBranchIdToRegister(
    groups: GroupBodyCreate[],
    createdBranches: Branch[]
  ) {
    const registerBarsWithBranchId: Partial<RegisterBar>[] = [];
    const registerTicketsWithBranchId: Partial<RegisterTicket>[] = [];
    createdBranches.forEach((branch: Partial<Branch>) => {
      groups.forEach((group: GroupBodyCreate) => {
        const foundBranch = group.Branches.find(
          (b: any) => b.name === branch.name
        );
        if (foundBranch) {
          foundBranch.RegisterBars.forEach(
            (registerBar: Partial<RegisterBar>) => {
              registerBarsWithBranchId.push({
                ...registerBar,
                BranchId: branch.id,
              });
            }
          );
          foundBranch.RegisterTickets.forEach(
            (registerTicket: Partial<RegisterTicket>) => {
              registerTicketsWithBranchId.push({
                ...registerTicket,
                BranchId: branch.id,
              });
            }
          );
        }
      });
    });
    return [registerBarsWithBranchId, registerTicketsWithBranchId];
  }
}
