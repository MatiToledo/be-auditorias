import { Request, Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { RegisterBarService } from "../services/register_bar";
import { UUID } from "crypto";
import { RegisterTicketService } from "../services/register_ticket";
export class RegisterTicketController {
  private registerTicketService = new RegisterTicketService();

  findByBranchId = async (req: Request, res: Response) => {
    try {
      const result = await this.registerTicketService.findByBranchId(
        req.params.BranchId as UUID
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_TICKETS_FIND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
