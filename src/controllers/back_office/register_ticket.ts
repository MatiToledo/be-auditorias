import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { RegisterTicketBackOfficeService } from "../../services/back_office/register_ticket";
import { UUID } from "crypto";
import { sequelize } from "../../DB";
import { Transaction } from "sequelize";

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
        .json(responseHandler(true, "REGISTER_TICKET_CREATED", result));
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
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_TICKET_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.registerTicketBackOfficeService.update(
        id,
        req.body
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_TICKET_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.registerTicketBackOfficeService.delete(id);
      res.status(200).json(responseHandler(true, "REGISTER_TICKET_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
