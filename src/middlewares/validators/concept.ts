import { NextFunction, Request, Response } from "express";
import { Schema, object, string } from "yup";

export class ConceptValidate {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      query: object({
        level: string().optional(),
        type: string().optional(),
        visible: string().optional(),
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
