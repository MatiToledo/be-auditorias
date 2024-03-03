import { NextFunction, Request, Response } from "express";
import { Schema, object, string } from "yup";

export class ConceptBackOfficeValidate {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      query: object({
        page: string().optional(),
        limit: string().optional(),
        q: string().optional(),
        level: string().optional(),
        type: string().optional(),
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
