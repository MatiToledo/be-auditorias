import { UUID } from "crypto";
import { Transaction } from "sequelize";
import {
  BodyCreateCompany,
  GroupBodyCreate,
  ICompanyService,
} from "../interfaces/company";
import { Branch, Group, RegisterBar, RegisterTicket } from "../models";
import { BranchRepository } from "../repositories/branch";
import { CompanyRepository } from "../repositories/company";
import { RegisterBarRepository } from "../repositories/register_bar";
import { RegisterTicketRepository } from "../repositories/register_ticket";
import { GroupRepository } from "./../repositories/group";

export class CompanyService implements ICompanyService {
  private companyRepository = new CompanyRepository();
  private groupRepository = new GroupRepository();
  private branchRepository = new BranchRepository();
  private registerBarRepository = new RegisterBarRepository();
  private registerTicketRepository = new RegisterTicketRepository();
  async create(
    body: BodyCreateCompany,
    transaction: Transaction
  ): Promise<void> {
    const company = await this.companyRepository.create(
      body.Company,
      transaction
    );
    const groupsWithCompanyId = this.addCompanyIdToGroup(
      body.Groups,
      company.id
    );
    const createdGroups = await this.groupRepository.bulkCreate(
      groupsWithCompanyId,
      transaction
    );
    const branchesWithGroupId = this.addGroupIdToBranches(
      body.Groups,
      createdGroups
    );
    const createdBranches = await this.branchRepository.bulkCreate(
      branchesWithGroupId,
      transaction
    );
    const [registerBarsWithBranchId, registerTicketsWithBranchId] =
      this.addBranchIdToRegister(body.Groups, createdBranches);
    await this.registerBarRepository.bulkCreate(
      registerBarsWithBranchId,
      transaction
    );
    await this.registerTicketRepository.bulkCreate(
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
