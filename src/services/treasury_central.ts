import { UUID } from "crypto";
import {
  ITreasuryCentralService,
  TreasuryCentralMovements,
} from "../interfaces/treasury_central";
import { TreasuryCentral } from "../models";
import { TreasuryCentralRepository } from "../repositories/treasury_central";
import { TreasuryCentralTypeEnum } from "../models/treasury_central";

export class TreasuryCentralService implements ITreasuryCentralService {
  private treasuryCentralRepository = new TreasuryCentralRepository();
  async create(body: Partial<TreasuryCentral>): Promise<TreasuryCentral> {
    return await this.treasuryCentralRepository.create(body);
  }
  async update(body: Partial<TreasuryCentral>): Promise<TreasuryCentral> {
    return await this.treasuryCentralRepository.update(body);
  }
  async delete(id: UUID): Promise<boolean> {
    const deleted = await this.treasuryCentralRepository.delete(id);
    return deleted === 1;
  }

  async getAllByBranchId(BranchId: UUID): Promise<TreasuryCentralMovements[]> {
    const movements = await this.treasuryCentralRepository.getAllByBranchId(
      BranchId
    );
    let balance = 0;
    const movementsWithBalance: TreasuryCentralMovements[] = movements.map(
      (movement) => {
        if (movement.type === "revenue") {
          balance += movement.amount;
        } else if (movement.type === "expense") {
          balance -= movement.amount;
        }

        return {
          ...movement.dataValues,
          balance: balance,
        };
      }
    );

    return movementsWithBalance;
  }
}
