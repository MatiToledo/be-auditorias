import { IRegisterBarClosureService } from "../interfaces/register_bar_closure";
import { RegisterBarClosure } from "../models";
import { RegisterBarClosureRepository } from "../repositories/register_bar_closure";

export class RegisterBarClosureService implements IRegisterBarClosureService {
  private registerBarClosureRepository = new RegisterBarClosureRepository();
  async create(body: Partial<RegisterBarClosure>): Promise<RegisterBarClosure> {
    return await this.registerBarClosureRepository.create(body);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
}
