import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { TreasuryNightRetirementFinishBackOfficeService } from "../../services/back_office/treasury_night_retirement_finish";

export class TreasuryNightRetirementFinishBackOfficeController {
  private treasuryNightRetirementFinishBackOfficeService =
    new TreasuryNightRetirementFinishBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result =
        await this.treasuryNightRetirementFinishBackOfficeService.getAll(
          req.query
        );
      res
        .status(200)
        .json(
          responseHandler(
            true,
            "TREASURY_NIGHT_RETIREMENTS_FINISH_FOUND",
            result
          )
        );
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
