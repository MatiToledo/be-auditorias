import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { TreasuryNightExpenseService } from "../services/treasury_night_expense";
import { CashRegisterService } from "../services/cash_register";
export class CashRegisterController {
  private cashRegisterService = new CashRegisterService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.cashRegisterService.create(req.body);
      res
        .status(200)
        .json(responseHandler(true, "CASH_REGISTER_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
