import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { TreasuryNightRetirementFinishBackOfficeService } from "../../services/back_office/treasury_night_retirement_finish";
import { TreasuryNightExpenseBackOfficeService } from "../../services/back_office/treasury_night_expense";

export class TreasuryNightExpenseBackOfficeController {
  private treasuryNightExpenseBackOfficeService =
    new TreasuryNightExpenseBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.treasuryNightExpenseBackOfficeService.getAll(
        req.query
      );
      res
        .status(200)
        .json(responseHandler(true, "TREASURY_NIGHT_EXPENSES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
