import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { ConceptService } from "../services/concept";
export class ConceptController {
  private conceptService = new ConceptService();

  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.conceptService.getAll(req.query);
      res.status(200).json(responseHandler(true, "CONCEPTS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
