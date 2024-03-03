import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { RegisterTicketBackOfficeService } from "../../services/back_office/register_ticket";

export class RegisterTicketBackOfficeController {
  private registerTicketBackOfficeService =
    new RegisterTicketBackOfficeService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.registerTicketBackOfficeService.create(
        req.body
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.registerTicketBackOfficeService.getAll(
        req.query
      );
      res.status(200).json(responseHandler(true, "BRANCHES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
