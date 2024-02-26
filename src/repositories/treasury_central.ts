import { UUID } from "crypto";
import {
  ITreasuryCentralRepository,
  TreasuryCentralQuery,
} from "../interfaces/treasury_central";
import { Concept, TreasuryCentral } from "../models";
import { Op, Sequelize } from "sequelize";

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

  async getAllByBranchId(
    BranchId: UUID,
    queries: TreasuryCentralQuery
  ): Promise<TreasuryCentral[]> {
    try {
      return await TreasuryCentral.findAll({
        where: {
          BranchId,
          date: {
            [Op.between]: [queries.startDate, queries.endDate],
          },
        },
        attributes: [
          "id",
          "date",
          "type",
          "payment_method",
          "description",
          "amount",
          [Sequelize.literal('"Concept"."name"'), "concept"],
        ],
        include: [{ model: Concept, attributes: [] }],
        order: [["createdAt", "ASC"]],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURY_CENTRAL_NOT_FOUND`);
    }
  }
}
