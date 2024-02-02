import { NextFunction, Request, Response } from "express";
import { Schema, mixed, object, string } from "yup";
import { UserBORoleEnum } from "../../../models/back_office/user";

export class Auth_BOValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        Auth: object({
          email: string().required(),
          password: string().required(),
        }),
        User: object({
          fullName: string().required(),
          BranchId: string().uuid().required(),
          role: mixed<UserBORoleEnum>()
            .oneOf([
              UserBORoleEnum.ADMIN,
              UserBORoleEnum.AUDITOR,
              UserBORoleEnum.PARTNER,
            ])
            .required(),
        }),
      })
        .noUnknown(true)
        .strict(true),
    });
    try {
      const validate = await schema.validate({ body: req.body });
      if (validate) return next();
    } catch (error) {
      return res.status(400).json({ field: "body", message: error.message });
    }
  }
  static async logIn(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        email: string().required(),
        password: string().required(),
      })
        .noUnknown(true)
        .strict(true),
    });
    try {
      const validate = await schema.validate({ body: req.body });
      if (validate) return next();
    } catch (error) {
      return res.status(400).json({ field: "body", message: error.message });
    }
  }
}
