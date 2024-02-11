import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { GroupBackOfficeService } from "../../services/back_office/group";

export class GroupBackOfficeController {
  private groupBackOfficeService = new GroupBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.groupBackOfficeService.getAll(req.query);
      res.status(200).json(responseHandler(true, "GROUPS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  getAllByCompanyId = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.groupBackOfficeService.getAllByCompanyId(
        req.params.CompanyId
      );
      res.status(200).json(responseHandler(true, "GROUPS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
