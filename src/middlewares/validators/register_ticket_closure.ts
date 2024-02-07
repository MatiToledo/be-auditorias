import { NextFunction, Request, Response } from "express";
import { Schema, number, object, string } from "yup";

export class RegisterTicketClosureValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        date: string().required(),
        retirement_total: number().required(),
        retirement_finish: number().required(),
        expenses_total: number().required(),
        expenses_observations: string().required(),
        postnet_total: number().required(),
        transfers_total: number().required(),
        sold_total: number().required(),
        ticket_persons: number().required(),
        ticket_price: number().required(),
        persons_cant_branch: number().required(),
        persons_cant_bar: number().required(),
        observations: string().required(),
        photo: string().required(),
        RegisterTicketId: string().uuid().required(),
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
