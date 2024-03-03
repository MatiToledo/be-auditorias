import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { GroupBackOfficeService } from "../../services/back_office/group";
import { BranchBackOfficeService } from "../../services/back_office/branch";
import { RegisterBarBackOfficeService } from "../../services/back_office/register_bar";

export class RegisterBarBackOfficeController {
  private registerBarBackOfficeService = new RegisterBarBackOfficeService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.registerBarBackOfficeService.create(req.body);
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.registerBarBackOfficeService.getAll(req.query);
      res.status(200).json(responseHandler(true, "BRANCHES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
