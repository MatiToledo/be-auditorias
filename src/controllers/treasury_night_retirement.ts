import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { TreasuryNightRetirementService } from "../services/treasury_night_retirement";
export class TreasuryNightRetirementController {
  private treasuryNightRetirementService = new TreasuryNightRetirementService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.treasuryNightRetirementService.create(req.body);
      res
        .status(200)
        .json(
          responseHandler(true, "TREASURY_NIGHT_RETIREMENT_CREATED", result)
        );
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
