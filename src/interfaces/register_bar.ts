import { UUID } from "crypto";
import { RegisterBar } from "../models/register_bar";

export interface IRegisterBarService {
  findByBranchId(BranchId: UUID): Promise<RegisterBar[]>;
}

export interface IRegisterBarRepository {
  findByBranchId(BranchId: UUID): Promise<RegisterBar[]>;
}
