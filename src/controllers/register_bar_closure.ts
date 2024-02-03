import { Request, Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { RegisterBarClosureService } from "../services/register_bar_closure";
export class RegisterBarClosureController {
  private registerBarClosureService = new RegisterBarClosureService();

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.registerBarClosureService.create(req.body);
      res
        .status(200)
        .json(responseHandler(true, "Register_BAR_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
