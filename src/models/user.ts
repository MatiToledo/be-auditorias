import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
export enum UserRoleEnum {
  till = "till",
  till_bar = "till_bar",
  till_ticket = "till_ticket",
  treasury = "treasury",
  treasury_night = "treasury_night",
  treasury_central = "treasury_central",
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
        UserRoleEnum.till,
        UserRoleEnum.till_bar,
        UserRoleEnum.till_ticket,
        UserRoleEnum.treasury,
        UserRoleEnum.treasury_night,
        UserRoleEnum.treasury_central,
      ],
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" }
);
