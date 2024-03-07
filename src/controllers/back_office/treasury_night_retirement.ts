import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { TreasuryNightRetirementBackOfficeService } from "../../services/back_office/treasury_night_retirement";
import { sequelize } from "../../DB";
import { UUID } from "crypto";
import { Transaction } from "sequelize";

export class TreasuryNightRetirementBackOfficeController {
  private TreasuryNightRetirementBackOfficeService =
    new TreasuryNightRetirementBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.TreasuryNightRetirementBackOfficeService.getAll(
        req.query
      );
      res
        .status(200)
        .json(
          responseHandler(true, "TREASURY_NIGHT_RETIREMENTS_FOUND", result)
        );
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.TreasuryNightRetirementBackOfficeService.update(
        id,
        req.body
      );
      res
        .status(200)
        .json(
          responseHandler(true, "TREASURY_NIGHT_RETIREMENT_UPDATED", result)
        );
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.TreasuryNightRetirementBackOfficeService.delete(id);
      res
        .status(200)
        .json(responseHandler(true, "TREASURY_NIGHT_RETIREMENT_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
