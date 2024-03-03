import { Op, WhereOptions } from "sequelize";
import {
  AllCompany,
  ICompanyBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/company";
import { buildPagination } from "../../libs/buildPagination";
import { CompanyBackOfficeRepository } from "../../repositories/back_office/company";
import { Company } from "../../models";

export class CompanyBackOfficeService implements ICompanyBackOfficeService {
  private companyBackOfficeRepository = new CompanyBackOfficeRepository();
  async create(body: Partial<Company>): Promise<Company> {
    return await this.companyBackOfficeRepository.create(body);
  }
  async getAll(
    queries: QueriesGetAll
  ): Promise<{ rows: AllCompany[]; count: number }> {
    let groupCount = 0;
    let branchCount = 0;
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const companies = await this.companyBackOfficeRepository.getAll(
      where,
      pagination
    );
    companies.rows.forEach((company) => {
      company.Groups?.forEach((group) => {
        groupCount++;
        branchCount += group.Branches?.length || 0;
      });
    });
    return {
      count: companies.count,
      rows: companies.rows.map((company) => {
        let groupCount = 0;
        let branchCount = 0;
        company.Groups?.forEach((group) => {
          groupCount++;
          branchCount += group.Branches?.length || 0;
        });
        return {
          id: company.id,
          name: company.name,
          groupsCant: groupCount,
          branchesCant: branchCount,
        };
      }),
    };
  }

  private buildQueriesFilters(queries: QueriesGetAll) {
    const where = {
      [Op.and]: [],
    };
    for (const query of Object.keys(queries) as []) {
      if (queries[query]) {
        switch (query) {
          case "q":
            where[Op.and].push({
              [Op.or]: [{ name: { [Op.iLike]: `%${queries.q}%` } }],
            });
            break;
          default:
            break;
        }
      }
    }

    return where as WhereOptions;
  }

  // async superCreate(
  //   body: BodyCreateCompany,
  //   transaction: Transaction
  // ): Promise<void> {
  //   const company = await this.companyBackOfficeRepository.create(
  //     body.Company,
  //     transaction
  //   );
  //   const groupsWithCompanyId = this.addCompanyIdToGroup(
  //     body.Groups,
  //     company.id
  //   );
  //   const createdGroups = await this.groupBackOfficeService.bulkCreate(
  //     groupsWithCompanyId,
  //     transaction
  //   );
  //   const branchesWithGroupId = this.addGroupIdToBranches(
  //     body.Groups,
  //     createdGroups
  //   );
  //   const createdBranches = await this.branchBackOfficeService.bulkCreate(
  //     branchesWithGroupId,
  //     transaction
  //   );
  //   const [registerBarsWithBranchId, registerTicketsWithBranchId] =
  //     this.addBranchIdToRegister(body.Groups, createdBranches);
  //   await this.registerBarBackOfficeService.bulkCreate(
  //     registerBarsWithBranchId,
  //     transaction
  //   );
  //   await this.registerTicketBackOfficeService.bulkCreate(
  //     registerTicketsWithBranchId,
  //     transaction
  //   );
  //   return;
  // }

  /////////////////////////////////////////////////////////////////////////////////////////////

  // private addCompanyIdToGroup(groups: GroupBodyCreate[], CompanyId: UUID) {
  //   return groups.map((group) => {
  //     group.CompanyId = CompanyId;
  //     return group;
  //   });
  // }

  // private addGroupIdToBranches(
  //   groups: { name: string; Branches: Partial<Branch>[] }[],
  //   createdGroups: Group[]
  // ) {
  //   const branchesWithGroupId: Partial<Branch>[] = [];
  //   createdGroups.forEach((createdGroup: Group) => {
  //     groups.forEach((group) => {
  //       if (group.name === createdGroup.name) {
  //         group.Branches.forEach((branch: Partial<Branch>) => {
  //           branch.GroupId = createdGroup.id;
  //           branchesWithGroupId.push(branch);
  //         });
  //       }
  //     });
  //   });
  //   return branchesWithGroupId;
  // }
  // private addBranchIdToRegister(
  //   groups: GroupBodyCreate[],
  //   createdBranches: Branch[]
  // ) {
  //   const registerBarsWithBranchId: Partial<RegisterBar>[] = [];
  //   const registerTicketsWithBranchId: Partial<RegisterTicket>[] = [];
  //   createdBranches.forEach((branch: Partial<Branch>) => {
  //     groups.forEach((group: GroupBodyCreate) => {
  //       const foundBranch = group.Branches.find(
  //         (b: any) => b.name === branch.name
  //       );
  //       if (foundBranch) {
  //         foundBranch.RegisterBars.forEach(
  //           (registerBar: Partial<RegisterBar>) => {
  //             registerBarsWithBranchId.push({
  //               ...registerBar,
  //               BranchId: branch.id,
  //             });
  //           }
  //         );
  //         foundBranch.RegisterTickets.forEach(
  //           (registerTicket: Partial<RegisterTicket>) => {
  //             registerTicketsWithBranchId.push({
  //               ...registerTicket,
  //               BranchId: branch.id,
  //             });
  //           }
  //         );
  //       }
  //     });
  //   });
  //   return [registerBarsWithBranchId, registerTicketsWithBranchId];
  // }
}
