import { Request, Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { RegisterBarClosureService } from "../services/register_bar_closure";
import { UUID } from "crypto";
import { AuthenticatedRequest } from "../middlewares";
export class RegisterBarClosureController {
  private registerBarClosureService = new RegisterBarClosureService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const UserId = req.userData.id;
      await this.registerBarClosureService.create({
        UserId,
        ...req.body,
      });
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CLOSURE_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  checkIfAlreadyCloseThatDay = async (req: Request, res: Response) => {
    try {
      const result =
        await this.registerBarClosureService.checkIfAlreadyCloseThatDay(
          req.body
        );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CLOSURE_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  getAllByBranchId = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { BranchId } = req.params;
      const result = await this.registerBarClosureService.getAllByBranchId(
        BranchId as UUID
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BAR_CLOSURES_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
