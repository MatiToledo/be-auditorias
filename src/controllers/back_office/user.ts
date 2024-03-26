import { UUID } from "crypto";
import { Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../../DB";
import { QueriesGetAll } from "../../interfaces/back_office/user";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { UserBackOfficeService } from "../../services/back_office/user";
import { UserService } from "../../services/user";

export class UserBackOfficeController {
  private userBackOfficeService = new UserBackOfficeService();
  private userService = new UserService();
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
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await sequelize.transaction(
        async (transaction: Transaction) => {
          return await this.userBackOfficeService.update(
            id,
            req.body,
            transaction
          );
        }
      );
      res.status(200).json(responseHandler(true, "USER_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.userService.delete(id);
      res.status(200).json(responseHandler(true, "USER_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  deleteAdmin = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.userBackOfficeService.delete(id);
      res.status(200).json(responseHandler(true, "USER_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  updateAdmin = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await sequelize.transaction(
        async (transaction: Transaction) => {
          return await this.userBackOfficeService.updateAdmin(
            id,
            req.body,
            transaction
          );
        }
      );
      res.status(200).json(responseHandler(true, "USER_ADMIN_UPDATED", result));
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
