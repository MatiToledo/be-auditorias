import { Response } from "express";
import { QueriesGetAll } from "../../interfaces/back_office/user";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { UserBackOfficeService } from "../../services/back_office/user";

export class UserBackOfficeController {
  private userBackOfficeService = new UserBackOfficeService();
  getMe = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.userData.id;
      const result = await this.userBackOfficeService.getMe(id);
      res.status(200).json(responseHandler(true, "USER_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.userBackOfficeService.getAll(
        req.query as QueriesGetAll
      );
      res.status(200).json(responseHandler(true, "USERS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  getAllAdmins = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.userBackOfficeService.getAllAdmins(
        req.query as QueriesGetAll
      );
      res.status(200).json(responseHandler(true, "ADMINS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
