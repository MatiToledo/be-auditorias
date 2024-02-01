import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../../DB";
import { responseHandler } from "../../libs/response_handler";
import { Auth_BOService } from "../../services/back_office/auth";

export class Auth_BOController {
  private authBOService = new Auth_BOService();

  createAuth = async (req: Request, res: Response) => {
    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        await this.authBOService.create(req.body, transaction);
      });
      res.status(200).json(responseHandler(true, "AUTH_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
