import { NextFunction, Request, Response } from "express";
import { Schema, number, object, string } from "yup";

export class UserBackOfficeValidate {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      query: object({
        q: string().optional(),
        page: string().optional(),
        limit: string().optional(),
        CompanyId: string().optional(),
        GroupId: string().optional(),
        BranchId: string().optional(),
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
  static async updateAdmin(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        User: object({
          fullName: string().optional(),
        }),
        Auth: object({
          password: string().optional(),
          email: string().optional(),
        }),
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
  static async update(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        User: object({
          fullName: string().optional(),
          role: string().optional(),
          dni: number().optional(),
          phone: number().optional(),
          photo: string().optional().nullable(),
          BranchId: string().uuid().optional(),
        }),
        Auth: object({
          password: string().optional(),
          email: string().optional(),
        }),
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
