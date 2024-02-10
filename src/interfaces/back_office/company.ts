import { Company } from "../../models";
export interface ICompanyBackOfficeService {
  getAll(): Promise<{ rows: Company[]; count: number }>;
}

export interface ICompanyBackOfficeRepository {
  getAll(): Promise<{ rows: Company[]; count: number }>;
}
