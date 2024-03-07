import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { GroupBackOfficeService } from "../../services/back_office/group";
import { BranchBackOfficeService } from "../../services/back_office/branch";
import { UUID } from "crypto";
import { Transaction } from "sequelize";
import { sequelize } from "../../DB";

export class BranchBackOfficeController {
  private branchBackOfficeService = new BranchBackOfficeService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.branchBackOfficeService.create(req.body);
      res.status(200).json(responseHandler(true, "BRANCH_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.branchBackOfficeService.update(id, req.body);
      res.status(200).json(responseHandler(true, "BRANCH_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.branchBackOfficeService.delete(id);
      res.status(200).json(responseHandler(true, "BRANCH_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.branchBackOfficeService.getAll(req.query);
      res.status(200).json(responseHandler(true, "BRANCHES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  getAllByCompanyId = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.branchBackOfficeService.getAllByGroupId(
        req.params.GroupId
      );
      res.status(200).json(responseHandler(true, "BRANCHES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
