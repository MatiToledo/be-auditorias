import { Request, Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { RegisterTicketClosureService } from "../services/register_ticket_closure";
import { UUID } from "crypto";
import { AuthenticatedRequest } from "../middlewares";
export class RegisterTicketClosureController {
  private registerTicketClosureService = new RegisterTicketClosureService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.registerTicketClosureService.create(req.body);
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_TICKET_CLOSURE_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  checkIfAlreadyCloseThatDay = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    try {
      const result =
        await this.registerTicketClosureService.checkIfAlreadyCloseThatDay(
          req.body
        );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CLOSURE_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  getAllByBranchId = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { BranchId } = req.params;
      const result = await this.registerTicketClosureService.getAllByBranchId(
        BranchId as UUID
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
