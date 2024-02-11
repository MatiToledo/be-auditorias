import { Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../../DB";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { CompanyBackOfficeService } from "../../services/back_office/company";

export class CompanyBackOfficeController {
  private companyBackOfficeService = new CompanyBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.companyBackOfficeService.getAll(req.query);
      res.status(200).json(responseHandler(true, "COMPANIES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        // await this.companyBackOfficeService.g(req.body, transaction);
      });
      res.status(200).json(responseHandler(true, "COMPANY_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
