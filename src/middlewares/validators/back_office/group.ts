import { NextFunction, Request, Response } from "express";
import { Schema, array, object, string } from "yup";

export class GroupBackOfficeValidate {
  static async getAllByCompanyId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema: Schema = object({
      params: object({
        CompanyId: string().uuid().required(),
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
