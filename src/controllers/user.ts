import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { UserService } from "./../services/user";
export class UserController {
  private userService = new UserService();

  me = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.userData.id;
      const result = await this.userService.me(id);
      res.status(200).json(responseHandler(true, "USER_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
