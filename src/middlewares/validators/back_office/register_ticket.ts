import { NextFunction, Request, Response } from "express";
import { Schema, object, string } from "yup";

export class RegisterTicketBackOfficeValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        name: string().required(),
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
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      query: object({
        q: string().optional(),
        page: string().optional(),
        limit: string().optional(),
        CompanyId: string().uuid().optional(),
        GroupId: string().uuid().optional(),
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
  static async getAllByGroupId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema: Schema = object({
      params: object({
        GroupId: string().uuid().required(),
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

  static async update(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        name: string().optional(),
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
