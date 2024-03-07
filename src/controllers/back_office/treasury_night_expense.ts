import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { TreasuryNightExpenseBackOfficeService } from "../../services/back_office/treasury_night_expense";
import { sequelize } from "../../DB";
import { UUID } from "crypto";
import { Transaction } from "sequelize";

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
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.treasuryNightExpenseBackOfficeService.update(
        id,
        req.body
      );
      res
        .status(200)
        .json(responseHandler(true, "TREASURY_NIGHT_EXPENSES_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.treasuryNightExpenseBackOfficeService.delete(id);
      res
        .status(200)
        .json(responseHandler(true, "TREASURY_NIGHT_EXPENSES_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
