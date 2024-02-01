import { NextFunction, Request, Response } from "express";
import { Schema, array, boolean, mixed, number, object, string } from "yup";
import { UserRoleEnum } from "../../models/user";

export class AuthValidate {
  static async create(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        Auth: object({
          email: string().required(),
          password: string().required(),
        }),
        User: object({
          fullName: string().required(),
          phone: number().required(),
          photo: string().optional(),
          dni: number().required(),
          role: mixed<UserRoleEnum>()
            .oneOf([
              UserRoleEnum.TILL,
              UserRoleEnum.TILL_BAR,
              UserRoleEnum.TILL_TICKET,
              UserRoleEnum.TREASURY,
              UserRoleEnum.TREASURY_NIGHT,
              UserRoleEnum.TREASURY_CENTRAL,
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
