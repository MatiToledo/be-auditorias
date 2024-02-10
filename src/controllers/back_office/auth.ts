import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../../DB";
import { responseHandler } from "../../libs/response_handler";
import { AuthBackOfficeService } from "../../services/back_office/auth";

export class AuthBackOfficeController {
  private authBackOfficeService = new AuthBackOfficeService();

  create = async (req: Request, res: Response) => {
    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        await this.authBackOfficeService.create(req.body, transaction);
      });
      res.status(200).json(responseHandler(true, "AUTH_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  logIn = async (req: Request, res: Response) => {
    try {
      const result = await this.authBackOfficeService.logIn(req.body);
      res.status(200).json(responseHandler(true, "LOGGED_IN", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
