import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { GroupBackOfficeService } from "../../services/back_office/group";
import { BranchBackOfficeService } from "../../services/back_office/branch";
import { RegisterBarBackOfficeService } from "../../services/back_office/register_bar";
import { RegisterBarClosureBackOfficeService } from "../../services/back_office/register_bar_closure";
import { sequelize } from "../../DB";
import { UUID } from "crypto";
import { Transaction } from "sequelize";

export class RegisterBarClosureBackOfficeController {
  private registerBarClosureBackOfficeService =
    new RegisterBarClosureBackOfficeService();
  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.registerBarClosureBackOfficeService.getAll(
        req.query
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CLOSURES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.registerBarClosureBackOfficeService.update(
        id,
        req.body
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CLOSURES_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.registerBarClosureBackOfficeService.delete(id);
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CLOSURES_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
