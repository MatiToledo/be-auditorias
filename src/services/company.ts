import { UUID } from "crypto";
import { Transaction } from "sequelize";
import {
  BodyCreateCompany,
  GroupBodyCreate,
  ICompanyService,
} from "../interfaces/company";
import { Branch, Group, RegisterBar, RegisterTicket } from "../models";
import { BranchRepository } from "../repositories/back_office/branch";
import { CompanyRepository } from "../repositories/company";
import { RegisterBarRepository } from "../repositories/register_bar";
import { RegisterTicketRepository } from "../repositories/register_ticket";
import { GroupRepository } from "../repositories/back_office/group";

export class CompanyService implements ICompanyService {
  private companyRepository = new CompanyRepository();
  private groupRepository = new GroupRepository();
  private branchRepository = new BranchRepository();
  private registerBarRepository = new RegisterBarRepository();
  private registerTicketRepository = new RegisterTicketRepository();
}
