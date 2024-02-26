import { Response } from "express";
import { responseHandler } from "../libs/response_handler";
import { AuthenticatedRequest } from "../middlewares";
import { ConceptService } from "../services/concept";
export class ConceptController {
  private conceptService = new ConceptService();

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const UserId = req.userData.id;
      await this.conceptService.create({
        UserId,
        ...req.body,
      });
      res.status(200).json(responseHandler(true, "CONCEPT_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
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
