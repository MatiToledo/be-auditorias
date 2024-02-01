import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import { responseHandler } from "../libs/response_handler";
import { sequelize } from "../DB";
import { Transaction } from "sequelize";
export class AuthController {
  private authService = new AuthService();

  createAuth = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      await sequelize.transaction(async (transaction: Transaction) => {
        await this.authService.create(body, transaction);
      });
      res.status(200).json(responseHandler(true, "AUTH_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
