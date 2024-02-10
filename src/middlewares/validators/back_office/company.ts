import { NextFunction, Request, Response } from "express";
import { Schema, array, object, string } from "yup";

export class CompanyBackOfficeValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        Company: object({
          name: string().required(),
        }).required(),
        Groups: array(
          object({
            name: string().required(),
            Branches: array(
              object({
                name: string().required(),
                RegisterBars: array(object({ name: string().required() })),
                RegisterTickets: array(object({ name: string().required() })),
              })
            ).required(),
          }).required()
        ).required(),
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
