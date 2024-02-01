import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import { responseHandler } from "../libs/response_handler";
export class AuthController {
  private authService = new AuthService();

  createAuth = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const result = await this.authService.create(data);
      res.status(200).json(responseHandler(true, "AUTH_CREATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
