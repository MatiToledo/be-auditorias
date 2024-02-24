import { NextFunction, Request, Response } from "express";
import { Schema, number, object, string } from "yup";

export class TreasuryCentralValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        date: string().required(),
        type: string().required(),
        payment_method: string().required(),
        concept: string().required(),
        amount: number().required(),
        description: string().required(),
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
