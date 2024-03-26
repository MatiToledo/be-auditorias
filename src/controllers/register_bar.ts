import { UUID } from "crypto";
import { Request, Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { RegisterBarService } from "../services/register_bar";
export class RegisterBarController {
  private registerBarService = new RegisterBarService();

  findByBranchId = async (req: Request, res: Response) => {
    try {
      const result = await this.registerBarService.findByBranchId(
        req.params.BranchId as UUID
      );
      res
        .status(200)
        .json(responseHandler(true, "REGISTER_BARS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
