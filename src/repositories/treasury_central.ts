import { UUID } from "crypto";
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
  async update(data: Partial<TreasuryCentral>): Promise<TreasuryCentral> {
    try {
      const [affectedRows] = await TreasuryCentral.update(data, {
        where: { id: data.id },
      });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_CENTRAL_NOT_UPDATED`);
    }
  }
  async delete(id: UUID): Promise<number> {
    try {
      return await TreasuryCentral.destroy({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_CENTRAL_NOT_DELETED`);
    }
  }

  async getAllByBranchId(BranchId: UUID): Promise<TreasuryCentral[]> {
    try {
      return await TreasuryCentral.findAll({
        where: { BranchId },
        order: [["createdAt", "ASC"]],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_CENTRAL_NOT_FOUND`);
    }
  }
}
