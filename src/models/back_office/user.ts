import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../../DB";
import { AuthBO } from "./auth";
import { Company } from "../company";

export enum UserBORoleEnum {
  ADMIN = "admin",
  PARTNER = "partner",
  AUDITOR = "auditor",
}

export class UserBO extends Model {
  declare id: CreationOptional<UUID>;
  declare fullName: string;
  declare role: UserBORoleEnum;
  declare AuthBOId: UUID;
  declare AuthBO: AuthBO;
  declare CompanyId: UUID;
  declare Company: Company;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserBO.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: [
        UserBORoleEnum.ADMIN,
        UserBORoleEnum.AUDITOR,
        UserBORoleEnum.PARTNER,
      ],
      allowNull: false,
    },
  },
  { sequelize, modelName: "UserBO" }
);
