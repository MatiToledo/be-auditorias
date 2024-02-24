import { ITreasuryCentralRepository } from "../interfaces/treasury_central";
import { TreasuryCentral } from "../models";

export class TreasuryCentralRepository implements ITreasuryCentralRepository {
  async create(data: Partial<TreasuryCentral>): Promise<TreasuryCentral> {
    try {
      return await TreasuryCentral.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_CENTRAL_NOT_CREATED`);
    }
  }
}
