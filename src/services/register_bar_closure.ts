import { UUID } from "crypto";
import { IRegisterBarClosureService } from "../interfaces/register_bar_closure";
import { RegisterBarClosure, RegisterTicketClosure } from "../models";
import { RegisterBarClosureRepository } from "../repositories/register_bar_closure";

export class RegisterBarClosureService implements IRegisterBarClosureService {
  private registerBarClosureRepository = new RegisterBarClosureRepository();
  async create(body: Partial<RegisterBarClosure>): Promise<RegisterBarClosure> {
    return await this.registerBarClosureRepository.create(body);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  async checkIfAlreadyCloseThatDay(
    body: Partial<RegisterBarClosure>
  ): Promise<boolean> {
    const registerBarClosure =
      await this.registerBarClosureRepository.checkIfAlreadyCloseThatDay(
        body.date,
        body.RegisterBarId
      );

    if (!registerBarClosure) return false;
    return true;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  async getAllByBranchId(BranchId: UUID): Promise<RegisterBarClosure[]> {
    return await this.registerBarClosureRepository.getAllByBranchId(BranchId);
  }
}
