import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Auth } from "./auth";
import { Branch } from "./branch";
export enum UserRoleEnum {
  Register = "register",
  RegisterBarClosure = "registerBarClosure",
  RegisterTicketClosure = "registerTicketClosure",
  TREASURY = "treasury",
  TREASURY_NIGHT = "treasury_night",
  TreasuryCentral = "TreasuryCentral",
}
export class User extends Model {
  declare id: CreationOptional<UUID>;
  declare fullName: string;
  declare phone: number;
  declare photo: string;
  declare role: UserRoleEnum;
  declare dni: number;
  declare AuthId: UUID;
  declare Auth: Auth;
  declare BranchId: UUID;
  declare Branch: Branch;
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
        UserRoleEnum.Register,
        UserRoleEnum.RegisterBarClosure,
        UserRoleEnum.RegisterTicketClosure,
        UserRoleEnum.TREASURY,
        UserRoleEnum.TreasuryCentral,
        UserRoleEnum.TREASURY_NIGHT,
      ],
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" }
);
