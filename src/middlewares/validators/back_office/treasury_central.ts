import { NextFunction, Request, Response } from "express";
import { Schema, number, object, string } from "yup";

export class TreasuryCentralBackOfficeValidate {
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
  static async update(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        date: string().optional(),
        type: string().optional(),
        payment_method: string().optional(),
        ConceptId: string().uuid().optional(),
        amount: number().optional(),
        description: string().optional(),
        BranchId: string().uuid().optional(),
      })
        .noUnknown(true)
        .strict(true),
    });
    try {
      const validate = await schema.validate({ body: req.body });
      if (validate) return next();
    } catch (error) {
      console.error(error);
      return res.status(400).json({ field: "body", message: "BAD_REQUEST" });
    }
  }
}
