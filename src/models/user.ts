import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
export enum UserRoleEnum {
  TILL = "till",
  TILL_BAR = "till_bar",
  TILL_TICKET = "till_ticket",
  TREASURY = "treasury",
  TREASURY_NIGHT = "treasury_night",
  TREASURY_CENTRAL = "treasury_central",
}
export class User extends Model {
  declare id: CreationOptional<UUID>;
  declare fullName: string;
  declare phone: number;
  declare photo: string;
  declare role: UserRoleEnum;
  declare dni: number;
  declare AuthId: UUID;
  declare BranchId: UUID;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dni: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: [
        UserRoleEnum.TILL,
        UserRoleEnum.TILL_BAR,
        UserRoleEnum.TILL_TICKET,
        UserRoleEnum.TREASURY,
        UserRoleEnum.TREASURY_CENTRAL,
        UserRoleEnum.TREASURY_NIGHT,
      ],
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" }
);
