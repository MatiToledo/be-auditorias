import { NextFunction, Request, Response } from "express";
import { Schema, object, string } from "yup";

export class TreasuryNightExpenseBackOfficeValidate {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      query: object({
        q: string().optional(),
        page: string().optional(),
        limit: string().optional(),
        CompanyId: string().uuid().optional(),
        GroupId: string().uuid().optional(),
        BranchId: string().uuid().optional(),
        ConceptId: string().uuid().optional(),
        startDate: string().required(),
        endDate: string().required(),
      })
        .noUnknown(true)
        .strict(true),
    });
    try {
      const validate = await schema.validate({ query: req.query });
      if (validate) return next();
    } catch (error) {
      console.error(error);
      return res.status(400).json({ field: "query", message: "BAD_REQUEST" });
    }
  }
}
