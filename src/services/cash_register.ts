import { date } from "yup";
import { ICashRegisterService } from "../interfaces/casg_register";
import { CashRegisterRepository } from "../repositories/cash_register";
import { CashRegister } from "./../models/cash_register";
import { RegisterBarClosureService } from "./register_bar_closure";
import { RegisterTicketClosureService } from "./register_ticket_closure";
import { TreasuryNightRetirementService } from "./treasury_night_retirement";
import { TreasuryNightRetirementFinishService } from "./treasury_night_retirement_finish";

export class CashRegisterService implements ICashRegisterService {
  private cashRegisterRepository = new CashRegisterRepository();
  private TreasuryNightRetirementFinishService =
    new TreasuryNightRetirementFinishService();
  private TreasuryNightRetirementService = new TreasuryNightRetirementService();
  async create(body: Partial<CashRegister>): Promise<CashRegister> {
    const retirements_finish =
      await this.TreasuryNightRetirementFinishService.getAllByBranchAndDateId({
        BranchId: body.BranchId,
        date: body.date,
      });
    const retirements =
      await this.TreasuryNightRetirementService.getAllByBranchAndDateId({
        BranchId: body.BranchId,
        date: body.date,
      });
    let retirements_total_amount = 0;
    for (const retirement of retirements) {
      console.log("retirement.amount: ", retirement.amount);
      retirements_total_amount = retirements_total_amount + retirement.amount;
    }
    console.log("retirements_total_amount: ", retirements_total_amount);

    return [retirements_finish, retirements] as any;
    return await this.cashRegisterRepository.create({
      ...body,
      difference: body.theoretical_amount - body.actual_amount,
    });
  }
}
