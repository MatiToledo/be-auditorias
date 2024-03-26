import { UUID } from "crypto";
import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { TreasuryCentralBackOfficeService } from "../../services/back_office/treasury_central";

export class TreasuryCentralBackOfficeController {
  private treasuryCentralBackOfficeService =
    new TreasuryCentralBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.treasuryCentralBackOfficeService.getAll(
        req.query
      );
      res
        .status(200)
        .json(responseHandler(true, "TREASURIES_CENTRAL_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.treasuryCentralBackOfficeService.update(
        id,
        req.body
      );
      res
        .status(200)
        .json(responseHandler(true, "TREASURY_CENTRAL_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.treasuryCentralBackOfficeService.delete(id);
      res.status(200).json(responseHandler(true, "TREASURY_CENTRAL_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
