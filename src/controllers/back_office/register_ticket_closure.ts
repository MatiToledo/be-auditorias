import { UUID } from "crypto";
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
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.registerTicketClosureBackOfficeService.update(
        id,
        req.body
      );
      res
        .status(200)
        .json(
          responseHandler(true, "REGISTER_TICKET_CLOSURES_UPDATED", result)
        );
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.registerTicketClosureBackOfficeService.delete(id);
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_TICKET_CLOSURES_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
