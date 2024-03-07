import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { GroupBackOfficeService } from "../../services/back_office/group";
import { BranchBackOfficeService } from "../../services/back_office/branch";
import { RegisterBarBackOfficeService } from "../../services/back_office/register_bar";
import { sequelize } from "../../DB";
import { Transaction } from "sequelize";
import { UUID } from "crypto";

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
      res.status(200).json(responseHandler(true, "REGISTER_BAR_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.registerBarBackOfficeService.update(
        id,
        req.body
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.registerBarBackOfficeService.delete(id);
      res.status(200).json(responseHandler(true, "REGISTER_BAR_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
