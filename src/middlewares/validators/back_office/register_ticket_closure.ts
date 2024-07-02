import { NextFunction, Request, Response } from "express";
import { Schema, array, number, object, string } from "yup";

export class RegisterTicketClosureBackOfficeValidate {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      query: object({
        q: string().optional(),
        page: string().optional(),
        limit: string().optional(),
        CompanyId: string().uuid().optional(),
        GroupId: string().uuid().optional(),
        BranchId: string().uuid().optional(),
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
        retirement_total: number().optional(),
        retirement_finish: number().optional(),
        expenses_total: number().optional(),
        expenses_observations: string().optional(),
        postnet_total: number().optional(),
        transfers_total: number().optional(),
        sold_total: number().optional(),
        tickets: array()
          .of(
            object({
              name: string().required(),
              quantity: number().required(),
            })
          )
          .optional(),
        total_earned_account: number().optional(),
        earned_account_bar: number().optional(),
        observations: string().optional(),
        photo: string().optional().nullable(),
        RegisterTicketId: string().uuid().optional(),
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
