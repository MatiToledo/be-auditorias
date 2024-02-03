import { Request, Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { RegisterTicketClosureService } from "../services/register_ticket";
export class RegisterTicketClosureController {
  private registerTicketClosureService = new RegisterTicketClosureService();

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.registerTicketClosureService.create(req.body);
      res
        .status(200)
        .json(responseHandler(true, "Register_TICKET_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
