import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../DB";
import { responseHandler } from "../libs/response_handler";
import { AuthService } from "../services/auth";
export class AuthController {
  private authService = new AuthService();

  logIn = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.logIn(req.body);
      res.status(200).json(responseHandler(true, "LOGGED_IN", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
