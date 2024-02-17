import { NextFunction, Request, Response } from "express";
import { Schema, number, object, string } from "yup";

export class TreasuryNightExpenseValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        date: string().required(),
        concept: string().required(),
        description: string().required(),
        quantity: number().required(),
        unit_price: number().required(),
        BranchId: string().uuid().required(),
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
