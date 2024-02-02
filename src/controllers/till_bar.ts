import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../DB";
import { responseHandler } from "../libs/response_handler";
import { AuthService } from "../services/auth";
export class TillBarController {
  private authService = new AuthService();

  create = async (req: Request, res: Response) => {
    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        await this.authService.create(req.body, transaction);
      });
      res.status(200).json(responseHandler(true, "AUTH_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
