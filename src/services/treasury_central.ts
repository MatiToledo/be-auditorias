import { UUID } from "crypto";
import {
  ITreasuryCentralService,
  TreasuryCentralMovements,
  TreasuryCentralQuery,
} from "../interfaces/treasury_central";
import { TreasuryCentralRepository } from "../repositories/treasury_central";
import { TreasuryCentral } from "../models";

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

  async getAllByBranchId(
    BranchId: UUID,
    queries: TreasuryCentralQuery
  ): Promise<TreasuryCentralMovements[]> {
    const movements = await this.treasuryCentralRepository.getAllByBranchId(
      BranchId,
      queries
    );
    const movementsWithBalance = await this.calculateBalances(movements);
    console.log("movementsWithBalance: ", movementsWithBalance);

    return movementsWithBalance;
  }

  async calculateBalances(treasury_centrals: TreasuryCentral[]): Promise<any> {
    try {
      const allMovements = await TreasuryCentral.findAll({
        attributes: ["id", "payment_method", "type", "amount", "BranchId"],
        order: [["createdAt", "ASC"]],
      });
      const allBranches = allMovements
        .map((movement) => movement.BranchId)
        .filter((value, index, self) => self.indexOf(value) === index);

      let branchMovementsWithBalance = [];

      for (const branch of allBranches) {
        console.log("branch: ", branch);
        let balanceCash = 0;
        let balanceBank = 0;
        let balanceTransfer = 0;

        const branchMovements = allMovements.filter(
          (movement) => movement.BranchId === branch
        );
        function pushBalanceValue(balance, type, amount) {
          if (type === "revenue") {
            balance += amount;
          } else if (type === "expense") {
            balance -= amount;
          }
          return balance;
        }
        branchMovements.map((movement) => {
          switch (movement.payment_method) {
            case "cash":
              balanceCash = pushBalanceValue(
                balanceCash,
                movement.type,
                movement.amount
              );
              break;
            case "bank":
              balanceBank = pushBalanceValue(
                balanceBank,
                movement.type,
                movement.amount
              );
              break;
            case "transfer":
              balanceTransfer = pushBalanceValue(
                balanceTransfer,
                movement.type,
                movement.amount
              );
              break;

            default:
              break;
          }
          branchMovementsWithBalance.push({
            id: movement.id,
            balanceCash,
            balanceBank,
            balanceTransfer,
          });
        });
      }
      return treasury_centrals.map((treasury_central) => {
        const movementWithHistoryBalance = branchMovementsWithBalance.find(
          (movement) => movement.id === treasury_central.id
        );
        console.log("movementWithHistoryBalance: ", movementWithHistoryBalance);
        console.log(
          "treasury_central.dataValues: ",
          treasury_central.dataValues
        );
        return {
          ...treasury_central.dataValues,
          balanceCash: movementWithHistoryBalance.balanceCash,
          balanceBank: movementWithHistoryBalance.balanceBank,
          balanceTransfer: movementWithHistoryBalance.balanceTransfer,
        };
      });
    } catch (error) {
      console.error(error);
      throw new Error(`TREASURIES_CENTRAL_NOT_FOUND`);
    }
  }
}
