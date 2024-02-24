import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { TreasuryCentralService } from "../services/treasury_central";
export class TreasuryCentralController {
  private treasuryCentralService = new TreasuryCentralService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.treasuryCentralService.create(req.body);
      res
        .status(200)
        .json(responseHandler(true, "TREASURY_CENTRAL_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
