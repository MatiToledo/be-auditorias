import { Transaction } from "sequelize";
import { IRegisterBarRepository } from "../interfaces/register_bar";
import { RegisterBar } from "./../models/register_bar";
import { UUID } from "crypto";

export class RegisterBarRepository implements IRegisterBarRepository {
  async findByBranchId(BranchId: UUID): Promise<RegisterBar[]> {
    try {
      return await RegisterBar.findAll({
        where: {
          BranchId,
        },
        attributes: ["id", "name"],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`REGISTER_BARS_NOT_FOUND`);
    }
  }
}
