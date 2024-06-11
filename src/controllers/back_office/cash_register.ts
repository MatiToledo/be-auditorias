import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { TreasuryNightExpenseBackOfficeService } from "../../services/back_office/treasury_night_expense";
import { CashRegisterBackOfficeService } from "../../services/back_office/cash_register";

export class CashRegisterBackOfficeController {
  private cashRegisterBackOfficeService = new CashRegisterBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.cashRegisterBackOfficeService.getAll(req.query);
      res
        .status(200)
        .json(responseHandler(true, "CASH_REGISTERS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
