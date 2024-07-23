import { UUID } from "crypto";
import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { CashRegisterBackOfficeService } from "../../services/back_office/cash_register";

export class CashRegisterBackOfficeController {
  private cashRegisterBackOfficeService = new CashRegisterBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.cashRegisterBackOfficeService.getAll(req.query);
      res
        .status(200)
        .json(responseHandler(true, "CASH_REGISTERS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.cashRegisterBackOfficeService.update(
        id,
        req.body
      );
      res
        .status(200)
        .json(responseHandler(true, "CASH_REGISTER_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
