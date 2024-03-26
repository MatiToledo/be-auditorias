import { NextFunction, Request, Response } from "express";
import { Schema, mixed, number, object, string } from "yup";
import { UserBORoleEnum } from "../../../models/back_office/user";
import { UserRoleEnum } from "../../../models/user";

export class AuthBOValidate {
  static async createAdmin(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        Auth: object({
          email: string().required(),
          password: string().required(),
        }),
        User: object({
          fullName: string().required(),
          BranchId: string().uuid().optional(),
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
      console.error(error);
      return res.status(400).json({ field: "body", message: "BAD_REQUEST" });
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    const schema: Schema = object({
      body: object({
        Auth: object({
          email: string().required(),
          password: string().required(),
        }),
        User: object({
          fullName: string().required(),
          phone: number().required(),
          photo: string().optional().nullable(),
          dni: number().required(),
          role: mixed<UserRoleEnum>()
            .oneOf([
              UserRoleEnum.REGISTER,
              UserRoleEnum.REGISTER_BAR_CLOSURE,
              UserRoleEnum.REGISTER_TICKET_CLOSURE,
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
      console.error(error);
      return res.status(400).json({ field: "body", message: "BAD_REQUEST" });
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
      console.error(error);
      return res.status(400).json({ field: "body", message: "BAD_REQUEST" });
    }
  }
}
