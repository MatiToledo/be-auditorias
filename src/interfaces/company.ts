import { Transaction } from "sequelize";
import { Company } from "../models";

export interface ICompanyService {}

export interface ICompanyRepository {
  create(data: Partial<Company>, transaction: Transaction): Promise<Company>;
}
