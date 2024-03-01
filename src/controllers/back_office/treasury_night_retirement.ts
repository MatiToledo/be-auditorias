import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { TreasuryNightRetirementBackOfficeService } from "../../services/back_office/treasury_night_retirement";

export class TreasuryNightRetirementBackOfficeController {
  private TreasuryNightRetirementBackOfficeService =
    new TreasuryNightRetirementBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.TreasuryNightRetirementBackOfficeService.getAll(
        req.query
      );
      res.status(200).json(responseHandler(true, "BRANCHES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
