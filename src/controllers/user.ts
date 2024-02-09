import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { UserService } from "./../services/user";
import { QueriesGetAll } from "../interfaces/user";
export class UserController {
  private userService = new UserService();

  me = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.userData.id;
      const result = await this.userService.me(id);
      res.status(200).json(responseHandler(true, "USER_FIND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.userService.getAll(req.query as QueriesGetAll);
      res.status(200).json(responseHandler(true, "USERS_FIND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
