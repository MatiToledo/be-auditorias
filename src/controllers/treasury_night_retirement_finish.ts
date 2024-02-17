import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { TreasuryNightRetirementFinishService } from "../services/treasury_night_retirement_finish";
export class TreasuryNightRetirementFinishController {
  private treasuryNightRetirementFinishService =
    new TreasuryNightRetirementFinishService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      console.log(new Date());

      const result = await this.treasuryNightRetirementFinishService.create(
        req.body
      );
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
