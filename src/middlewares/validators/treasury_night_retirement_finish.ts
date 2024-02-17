import { NextFunction, Request, Response } from "express";
import { Schema, mixed, number, object, string } from "yup";
import { TreasuryNightRetirementTypeEnum } from "../../models/treasury_night_retirement";

export class TreasuryNightRetirementFinishValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        date: string().required(),
        type: mixed<TreasuryNightRetirementTypeEnum>()
          .oneOf([
            TreasuryNightRetirementTypeEnum.BAR,
            TreasuryNightRetirementTypeEnum.TICKET,
          ])
          .required(),
        expenses: number().required(),
        postnet: number().required(),
        transfers: number().required(),
        amount: number().required(),
        RegisterBarId: string().uuid().optional(),
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
