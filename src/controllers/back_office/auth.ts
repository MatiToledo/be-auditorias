import { Transaction } from "sequelize";
import { Request, Response } from "express";
import { sequelize } from "../../DB";
import { Auth_BOService } from "../../services/back_office/auth";
import { responseHandler } from "../../libs/response_handler";

export class Auth_BOController {
  private authBOService = new Auth_BOService();

  createAuth = async (req: Request, res: Response) => {
    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        // await this.authService.create(req.body, transaction);
      });
      res.status(200).json(responseHandler(true, "AUTH_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
