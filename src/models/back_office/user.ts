import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../../DB";

export enum UserBORoleEnum {
  ADMIN = "admin",
  PARTNER = "partner",
  AUDITOR = "auditor",
}

export class User_BO extends Model {
  declare id: CreationOptional<UUID>;
  declare fullName: string;
  declare phone: number;
  declare photo: string;
  declare role: UserBORoleEnum;
  declare dni: number;
  declare AuthId: UUID;
  declare BranchId: UUID;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User_BO.init(
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
  { sequelize, modelName: "User_BO" }
);
