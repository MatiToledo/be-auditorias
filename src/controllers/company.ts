import { Request, Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { CompanyService } from "../services/company";
import { sequelize } from "../DB";
import { Transaction } from "sequelize";
export class CompanyController {
  private CompanyService = new CompanyService();

  create = async (req: Request, res: Response) => {
    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        await this.CompanyService.create(req.body, transaction);
      });
      res.status(200).json(responseHandler(true, "COMPANY_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
