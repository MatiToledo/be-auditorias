import { Response } from "express";
import { QueriesGetAll } from "../../interfaces/back_office/user";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { UserBackOfficeService } from "../../services/back_office/user";
import { CompanyBackOfficeService } from "../../services/back_office/company";

export class CompanyBackOfficeController {
  private companyBackOfficeService = new CompanyBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.companyBackOfficeService.getAll();
      res.status(200).json(responseHandler(true, "USERS_FIND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
