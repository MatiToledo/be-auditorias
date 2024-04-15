import { NextFunction, Request, Response } from "express";
import { Schema, array, number, object, string } from "yup";

export class RegisterBarClosureValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        date: string().required(),
        retirement_total: number().required(),
        postnet_total: number().required(),
        transfers_total: number().required(),
        transfers_total_system: number().required(),
        cash_total_system: number().required(),
        expenses_total: number().required(),
        expenses_observations: string().required(),
        observations: string().required(),
        consumptions: array()
          .of(
            object({
              description: string().required(),
              quantity: number().required(),
            })
          )
          .required(),
        photo: string().required(),
        RegisterBarId: string().uuid().required(),
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
  static async checkIfAlreadyCloseThatDay(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema: Schema = object({
      body: object({
        date: string().required(),
        RegisterBarId: string().uuid().required(),
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
  static async getAllByBranchId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema: Schema = object({
      params: object({
        BranchId: string().uuid().required(),
      })
        .noUnknown(true)
        .strict(true),
    });
    try {
      const validate = await schema.validate({ params: req.params });
      if (validate) return next();
    } catch (error) {
      console.error(error);
      return res.status(400).json({ field: "params", message: "BAD_REQUEST" });
    }
  }
}
