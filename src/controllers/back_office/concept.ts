import { Response } from "express";
import { responseHandler } from "../../libs/response_handler";
import { AuthenticatedRequest } from "../../middlewares";
import { TreasuryNightExpenseBackOfficeService } from "../../services/back_office/treasury_night_expense";
import { ConceptBackOfficeService } from "../../services/back_office/concept";
import { sequelize } from "../../DB";
import { UUID } from "crypto";
import { Transaction } from "sequelize";

export class ConceptBackOfficeController {
  private conceptBackOfficeService = new ConceptBackOfficeService();
  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      await this.conceptBackOfficeService.create(req.body);
      res.status(200).json(responseHandler(true, "CONCEPT_CREATED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  getAll = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.conceptBackOfficeService.getAll(req.query);
      res.status(200).json(responseHandler(true, "CONCEPTS_FOUND", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      const result = await this.conceptBackOfficeService.update(id, req.body);
      res.status(200).json(responseHandler(true, "CONCEPT_UPDATED", result));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id as UUID;
      await this.conceptBackOfficeService.delete(id);
      res.status(200).json(responseHandler(true, "CONCEPT_DELETED"));
    } catch (error) {
      console.error(error);
      res.status(400).json(responseHandler(false, error.message));
    }
  };
}
