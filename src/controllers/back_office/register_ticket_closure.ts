import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { RegisterTicketClosureBackOfficeService } from "../../services/back_office/register_ticket_closure";

export class RegisterTicketClosureBackOfficeController {
  private registerTicketClosureBackOfficeService =
    new RegisterTicketClosureBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.registerTicketClosureBackOfficeService.getAll(
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
