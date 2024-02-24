import { ITreasuryCentralService } from "../interfaces/treasury_central";
import { TreasuryCentral } from "../models";
import { TreasuryCentralRepository } from "../repositories/treasury_central";

export class TreasuryCentralService implements ITreasuryCentralService {
  private treasuryCentralRepository = new TreasuryCentralRepository();
  async create(body: Partial<TreasuryCentral>): Promise<TreasuryCentral> {
    return await this.treasuryCentralRepository.create(body);
  }
}
