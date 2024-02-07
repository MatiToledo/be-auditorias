import { UUID } from "crypto";
import { IRegisterBarService } from "../interfaces/register_bar";
import { RegisterBar } from "../models";
import { RegisterBarRepository } from "../repositories/register_bar";

export class RegisterBarService implements IRegisterBarService {
  private registerBarRepository = new RegisterBarRepository();

  async findByBranchId(BranchId: UUID): Promise<RegisterBar[]> {
    return await this.registerBarRepository.findByBranchId(BranchId);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
}
