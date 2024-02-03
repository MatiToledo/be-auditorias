import { NextFunction, Request, Response } from "express";
import { Schema, number, object, string } from "yup";

export class RegisterBarClosureValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        name: string().required(),
        retirement_total: number().required(),
        retirement_finish: number().required(),
        postnet_total: number().required(),
        transfers_total: number().required(),
        expenses_total: number().required(),
        expenses_observations: string().required(),
        observations: string().required(),
        consumptions: string().required(),
        photo: string().required(),
        BranchId: string().uuid().required(),
      })
        .noUnknown(true)
        .strict(true),
    });
    try {
      const validate = await schema.validate({ body: req.body });

      if (validate) return next();
    } catch (error) {
      return res.status(400).json({ field: "body", message: "BAD_REQUEST" });
    }
  }
}
