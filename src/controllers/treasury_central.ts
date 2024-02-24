import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { TreasuryCentralService } from "../services/treasury_central";
import { UUID } from "crypto";
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
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.treasuryCentralService.update(req.body);
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
      const result = await this.treasuryCentralService.delete(
        req.params.id as UUID
      );
      res
        .status(200)
        .json(responseHandler(true, "TREASURY_CENTRAL_DELETED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  getAllByBranchId = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { BranchId } = req.params;
      const result = await this.treasuryCentralService.getAllByBranchId(
        BranchId as UUID,
        req.query
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_TICKET_CLOSURES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
