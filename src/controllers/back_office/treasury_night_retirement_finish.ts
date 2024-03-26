import { UUID } from "crypto";
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
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result =
        await this.treasuryNightRetirementFinishBackOfficeService.update(
          id,
          req.body
        );
      res
        .status(200)
        .json(
          responseHandler(
            true,
            "TREASURY_NIGHT_RETIREMENTS_FINISH_UPDATED",
            result
          )
        );
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.treasuryNightRetirementFinishBackOfficeService.delete(id);
      res
        .status(200)
        .json(
          responseHandler(true, "TREASURY_NIGHT_RETIREMENTS_FINISH_DELETED")
        );
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
