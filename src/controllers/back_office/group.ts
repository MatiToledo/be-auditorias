import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { GroupBackOfficeService } from "../../services/back_office/group";
import { sequelize } from "../../DB";
import { UUID } from "crypto";
import { Transaction } from "sequelize";

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
  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.groupBackOfficeService.create(req.body);
      res.status(200).json(responseHandler(true, "GROUP_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.groupBackOfficeService.update(id, req.body);
      res.status(200).json(responseHandler(true, "GROUP_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.groupBackOfficeService.delete(id);
      res.status(200).json(responseHandler(true, "GROUP_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
